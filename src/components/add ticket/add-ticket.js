import "./add-ticket.css";
import { Modal, Button } from "antd";
import React, { useState } from "react";
import { Input, Radio, message, useRef } from "antd";
import JoditEditor from "jodit-react"; // description
import axios from "axios"; // API

function AddTicket(props) {
  const [value1, setValue1] = useState("issue"); // type
  const [value2, setValue2] = useState("normal"); // priority
  const [value3, setValue3] = useState(" "); // subject
  const onChange1 = (e) => {
    setValue1(e.target.value);
  };
  const onChange2 = (e) => {
    setValue2(e.target.value);
  };

  const editor = useRef(null);
  const [content, setContent] = useState(""); // description

  function Modalhidefunc() {
    props.hidefunc();
    message.error("Ticket canceled");
  }

  function AddTicket(e) {
    // Add ticket
    e.preventDefault();
    if (value3.trim() === "") {
      message.error("Please fill in the subject field");
      return false;
    }
    if (content.trim() === "") {
      message.error("Please fill in the description field");
      return false;
    }

    const token = localStorage.getItem("token");
    const dataset = {
      type: value1,
      priority: value2,
      subject: value3,
      description: content
    };

    axios
      .post(
        "https://api.ticket.tempserver.ir/api/ticket/",
        {
          ...dataset,
        },
        {
          headers: {
            "content-type": "application/json",
            AUTHORIZATION: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setContent(""); // description
        setValue3(""); // subject
        if (res.status === 201 || res.status === 200) {
          message.success("Tickets added");
          props.changeTicket(); //!
          return res.data; 
        } else {
          message.error("something wrong");
          return res;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    props.hidefunc();
  }

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <>
      <Modal
        title={[
          <div key="1">
            <p>Add ticket</p>
            <Input
              value={value3} // subject
              onChange={(e) => setValue3(e.target.value)} // onChange for input, change if event occurs 
              placeholder="Subject"
            />
          </div>,
        ]}
        centered
        visible={props.open}
        onCancel={Modalhidefunc}
        footer={[
          <Button
            key="back"
            onClick={Modalhidefunc}
            className="btn-cancel btn-modal"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={(e) => AddTicket(e)}
            className="btn-modal"
          >
            Add
          </Button>,
        ]}
      >
        <div className="b-border">
          <span className="m-r">Type : </span>
          <Radio.Group onChange={onChange1} value={value1}>
            <Radio value={"issue"}>Issue</Radio>
            <Radio value={"task"}>Task</Radio>
          </Radio.Group>
        </div>
        <br />
        <div className="b-border">
          <span className="m-r">Priority : </span>
          <Radio.Group onChange={onChange2} value={value2}>
            <Radio value={"normal"}>Normal</Radio>
            <Radio value={"urgent"}>Urgent</Radio>
            <Radio value={"critical"}>Critical</Radio>
          </Radio.Group>
        </div>
        <br />
        <p className="m-r align-text">Description </p>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        />
      </Modal>
    </>
  );
}

export default AddTicket;
