import "./add-ticket.css";
import { Modal, Button, message, Radio, Input } from "antd";
import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react"; // description
import axios from "../../axios"; // API
import { useTranslation } from "react-i18next";
import i18n from "../../utilies/i18n";

function AddTicket(props) {
  const { t } = useTranslation();
  const [isfa, setfa] = useState(false);
  const Detectfa = (lng) => {
    if (lng === "fa") setfa(true);
    else setfa(false);
  };

  i18n.on("languageChanged", (lng) => {
    Detectfa(lng);
  });

  useEffect(()=>{
    if(i18n.language == 'fa'){
      setfa(true) 
    }
    else{
      setfa(false)
    }
  },[])


  const [value1, setValue1] = useState("issue"); // type
  const [value2, setValue2] = useState("normal"); // priority
  const [value3, setValue3] = useState(""); // subject
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
    message.error(t("message.failed-add"));
  }

  function AddTicket(e) {
    // Add ticket
    e.preventDefault();
    if (value3.trim() === "") {
      message.error(t("message.subject"));
      return false;
    }
    if (content.trim() === "") {
      message.error(t("message.description"));
      return false;
    }

    // const token = localStorage.getItem("token");
    const dataset = {
      type: value1 == "issue" ? false : true,
      priority: value2,
      subject: value3,
      content: content,
    };
    axios
      .post("api/ticket", {
        ...dataset,
      })
      .then(() => {
        setContent(""); // description
        setValue3(""); // subject
        message.success(t("message.success-add"));
        props.changeTicket(); //!
        // return res.data;
      })
      .catch(() => {
        message.error(t("message.failed-add"));
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
            <p className={isfa ? "add-fa" : "add"}> {t("add.add")} </p>{" "}
            <Input
              className={isfa ? "subject-fa" : "subject"}
              placeholder={t("subject.subject")}
              value={value3} // subject
              onChange={(e) => setValue3(e.target.value)} // onChange for input, change if event occurs
            />{" "}
          </div>,
        ]}
        // centered
        style = {{
          marginTop: "-35px"
        }}
        visible={props.open}
        onCancel={Modalhidefunc}
        footer={[
          <Button
            key="back"
            onClick={Modalhidefunc}
            className={isfa ? "cancel-btn-fa" : "cancel-btn"}
          >
            {t("cancel.cancel")}{" "}
          </Button>,
          <Button
            key="submit"
            onClick={(e) => AddTicket(e)}
            className={isfa ? "add-btn-fa" : "add-btn"}
          >
            {t("add.add-ticket")}{" "}
          </Button>,
        ]}
      >
        <div className={isfa ? "m-r-fa" : "m-r"}>
          <span className={isfa ? "type-priority-mr-fa" : "type-priority-mr"}>
            {" "}
            {t("type.type")}{" "}
          </span>{" "}
          <Radio.Group onChange={onChange1} value={value1}>
            <Radio
              value={"issue"}
              className={isfa ? "type-priority-fa" : "type-priority"}
            >
              {t("type.issue")}{" "}
            </Radio>{" "}
            <Radio
              value={"task"}
              className={isfa ? "type-priority-fa" : "type-priority"}
            >
              {t("type.task")}{" "}
            </Radio>{" "}
          </Radio.Group>{" "}
        </div>{" "}
        <br />
        <div className={isfa ? "m-r-fa" : "m-r"}>
          <span className={isfa ? "type-priority-mr-fa" : "type-priority-mr"}>
            {" "}
            {t("priority.priority")}{" "}
          </span>{" "}
          <Radio.Group onChange={onChange2} value={value2}>
            <Radio
              value={"normal"}
              className={isfa ? "type-priority-fa" : "type-priority"}
            >
              {t("priority.normal")}{" "}
            </Radio>{" "}
            <Radio
              value={"urgent"}
              className={isfa ? "type-priority-fa" : "type-priority"}
            >
              {t("priority.urgent")}{" "}
            </Radio>{" "}
            <Radio
              value={"critical"}
              className={isfa ? "type-priority-fa" : "type-priority"}
            >
              {t("priority.critical")}{" "}
            </Radio>{" "}
          </Radio.Group>{" "}
        </div>{" "}
        <br /> {/* className="m-r align-text" */}{" "}
        <p className={isfa ? "description-fa" : "description"}>
          {" "}
          {t("description.content")}{" "}
        </p>{" "}
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        />{" "}
      </Modal>{" "}
    </>
  );
}

export default AddTicket;
