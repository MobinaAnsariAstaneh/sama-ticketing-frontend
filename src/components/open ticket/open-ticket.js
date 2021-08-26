import "./open-ticket.css";
import { Drawer, Button, Spin, message, Comment, Avatar } from "antd";
import React, { useState, useEffect, useRef, memo } from "react";
import JoditEditor from "jodit-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Gravatar from "react-gravatar";
import axios from "../../axios";

const ExampleComment1 = (props) => {
  let usernameSet = localStorage.getItem("username"),
    notuser = "text_align_left";
  if (usernameSet !== props.name) {
    notuser = "active text_align_left";
  }
  console.log("props", props);
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
      content={
        <pre
          className="table"
          dangerouslySetInnerHTML={{ __html: props.message }}
        ></pre>
      }
    >
      {props.children}
    </Comment>
  );
};

function OpenTicket(props) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([{ ticket: 0 }]);
  const [Load, setLoad] = useState(false);
  const [spiner, setSpiner] = useState(false);
  const admin = localStorage.getItem("admin");

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

  //tag
  const answered = () => {
    axios
      .put(
        "api/ticket/" + props.data.key + "/?status=In Progress"
        )
      .then((res) => {
        if (res.status === 200 || res.status === 202) {
          props.changeComment();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const submited = () => {
    if (content.trim() === "") {
      message.error("There is no content to post, Enter the your comment");
      return false;
    }
    setSpiner(true);
    axios
      .put(
        "api/ticket/" + props.data.key + "/", 
      {
        content: content,
      }
      )
      .then((res) => {
        if (res.status === 202 || res.status === 201) {
          setContent("");
          props.changeComment();
          setLoad(true);
          setSpiner(false);
          message.success("Ticket has been successfully sent");
        } else {
          message.error("somthing Wrong, Problem during sending ticket");
        }
      })
      .catch((err) => {
        setSpiner(false);
        console.log(err.message);
      });
  };
  const deletingTicket = () => {
    props.deletTicket(comment[0].ticket_id);
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
      console.log("val", val);
      return (
        <ExampleComment1
          reply={replyfunc}
          key={key}
          name={val.user_id}
          date={val.updated_at}
          email={val.email}
          message={val.body}
        ></ExampleComment1>
      );
    });
    console.log(props.data);
  } else {
    commented = " ";
  }

  let elem, attr, classStatus, elemTicketrm;
  if (spiner) {
    attr = { disabled: true };
    elem = <Spin />;
  }

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
        Done
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

  if (props.data.status[0] === "Done") {
    classStatus = "ant-tag-red";
    elemTicketrm = "";
  } else if (props.data.status[0] === "open") {
    classStatus = "ant-tag-yellow";
  } else if (props.data.status[0] === "Answered") {
    classStatus = "ant-tag-purple";
  } else if (props.data.status[0] === "In Progress") {
    classStatus = "ant-tag-blue Progress-btn";
  } else if (props.data.status[0] === "new") {
    classStatus = "ant-tag-green";
  }
  let adminElement = "";
  if (admin == 1) {
    adminElement = (
      <div>
        <span>
          <Button onClick={() => answered("")} className="ant-tag-blue">
            In Progress
          </Button>
        </span>
      </div>
    );
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
            {adminElement}
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
