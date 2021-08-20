import "./open-ticket.css";
import { Drawer, Button, Spin } from "antd";
import React, { useState, useEffect, memo } from "react";
import { Comment, Avatar, message } from "antd";
import { useRef } from "react";
import JoditEditor from "jodit-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import Gravatar from "react-gravatar";

const ExampleComment1 = (props) => {
  let usernameSet = localStorage.getItem("username"),
    notuser = "";
  if (usernameSet !== props.name) {
    notuser = "active";
  }
  return (
    <Comment
      className={notuser}
      actions={[
        <span key="comment-nested-reply-to" onClick={props.reply}>
          Reply to
        </span>,
      ]}
      author={
        <div>
          {props.name} <span>{props.email}</span>
        </div>
      }
      datetime={
        <div className="mt-1">
          {props.date.split(".")[0].replace(/-/g, "/").replace("T", " - ")}
        </div>
      }
      avatar={
        <Avatar className="b-color" alt="sepideh">
          <Gravatar email={props.email} className="CustomAvatar-image" />
        </Avatar>
      }
      content={<pre dangerouslySetInnerHTML={{ __html: props.message }}></pre>}
    >
      {props.children}
    </Comment>
  );
};

function OpenTicket(props) {
  const token = localStorage.getItem("token");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([{ ticket: 0 }]);
  const [Load, setLoad] = useState(false);
  const [spiner, setSpiner] = useState(false);

  function onClose() {
    props.hidefunc();
  }

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };
  useEffect(() => {
    setComment(props.comments);
    setLoad(true);
  }, [Load]);
  useEffect(() => {
    // message.success("Ticket open");
  }, []);

  const answered = (tag) => {
    axios
      .put(
        "https://api.ticket.tempserver.ir/api/ticket/" + props.data.key + "/",
        {
          subject: props.data.subject,
          priority: props.data.priority,
          description: props.data.description,
          team: props.data.team.id,
          tag: tag,
        },
        {
          headers: {
            "content-type": "application/json",
            AUTHORIZATION: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          props.changeComment();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    if (props.data.status[0] === "new") {
      answered("open");
    }
  }, []);

  const submited = () => {
    if (content.trim() === "") {
      message.error("plase type somthing");
      return false;
    }
    setSpiner(true);
    axios
      .post(
        "https://api.ticket.tempserver.ir/api/comment/",
        {
          body: content,
          file01: "",
          file02: "",
          ticket: comment[0].ticket,
        },
        {
          headers: {
            "content-type": "application/json",
            AUTHORIZATION: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          const tag = props.data.status[0] === "open" ? "answered" : "open";
          answered(tag);
          setContent("");
          props.changeComment();
          setLoad(true);
          setSpiner(false);
          message.success("Tickets sent");
        } else {
          message.error("somthing Wrong");
        }
      })
      .catch((err) => {
        setSpiner(false);
        console.log(err.message);
      });
  };
  const deletingTicket = () => {
    props.deletTicket(comment[0].ticket);
    onClose();
  };
  const replyfunc = () => {
    const elem = document.querySelectorAll(".jodit-wysiwyg");
    if (elem !== undefined) {
      elem[elem.length - 1].focus();
    }
  };
  let commented;
  if (Load) {
    commented = props.comments.map((val, key) => {
      return (
        <ExampleComment1
          reply={replyfunc}
          key={key}
          name={val.user.username}
          date={val.updated_at}
          email={val.user.email}
          message={val.body}
        ></ExampleComment1>
      );
    });
  } else {
    commented = "";
  }
  let elem, attr, classStatus, elemTicketrm;
  if (spiner) {
    attr = { disabled: true };
    elem = <Spin />;
  }
  classStatus = "ant-tag-green";
  elemTicketrm = (
    <>
      <p className="align-text">Add Comment </p>
      <JoditEditor
        direction={"ltr"}
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex  of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
      <br />
      <Button onClick={deletingTicket} className="btn-drwer btn-cancel ">
        Close
      </Button>
      <Button
        onClick={onClose}
        style={{ marginRight: 8 }}
        className="btn-cancel btn-drwer"
      >
        Cancel
      </Button>
      <Button {...attr} onClick={submited} className="btn-drwer">
        Send
        {elem}
      </Button>
    </>
  );
  if (props.data.status[0] === "done") {
    classStatus = "ant-tag-red";
    elemTicketrm = "";
  } else if (props.data.status[0] === "open") {
    classStatus = "ant-tag-yellow";
  } else if (props.data.status[0] === "answered") {
    classStatus = "ant-tag-blue";
  } else if (props.data.status[0] === "inprogres") {
    classStatus = "ant-tag-purple Progress-btn";
  }
  return (
    <>
      <Drawer
        title={[
          <div key="2" className="header_open_ticket">
            <div>
              <p className="p-align">
                <ArrowLeftOutlined className="icon-back" onClick={onClose} />
                <span className="ticket-id">ticket {props.data.key}</span>
              </p>
              <span>
                <span className="openTicket__subject">
                  {props.data.subject}
                </span>
              </span>
              <span>
                <span className={"ant-tag " + classStatus}>
                  {props.data.status[0].toUpperCase()}
                </span>
              </span>
              <span className="font-span">
                - Created {props.data.created.split("T")[0].replace(/-/g, "/")}{" "}
                - Requester: {props.data.requester}
                <span className="color-name"></span>
              </span>
            </div>
            <div>
              <span>
                <Button
                  onClick={() => answered("inprogres")}
                  className="ant-tag-purple"
                >
                  In Progress
                </Button>
              </span>
            </div>
          </div>,
        ]}
        width={720}
        onClose={onClose}
        visible={props.open}
        bodyStyle={{ paddingBottom: 30 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            {elemTicketrm}
          </div>
        }
      >
        {commented}
      </Drawer>
    </>
  );
}

export default memo(OpenTicket);
