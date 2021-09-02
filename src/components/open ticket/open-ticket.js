import "./open-ticket.css";
import { Drawer, Button, Spin, message, Comment, Avatar } from "antd";
import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Gravatar from "react-gravatar";
import axios from "../../axios";
import { useTranslation } from "react-i18next";
import i18n from "../../utilies/i18n";
import moment from "jalali-moment";

const ExampleComment1 = (props) => {
  let idSet = localStorage.getItem("id"),
    notuser = "inactive text_align_left";
  if (idSet != props.id) {
    notuser = "active text_align_left";
  }
  return (
    <Comment
      className={notuser}
      author={
        <div>
          {" "}
          {props.name} <br />
          <span> {props.email} </span>{" "}
        </div>
      }
      datetime={
        <div className="mt-1">
          {" "}
          <span dangerouslySetInnerHTML={{ __html: props.date }} className={props.isfa ? "persianNo" : "" }></span>
        </div>
      }
      avatar={
        <Avatar className="b-color" alt="gravatar">
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
      {" "}
      {props.children}{" "}
    </Comment>
  );
};

function OpenTicket(props) {
  const { t } = useTranslation();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([{ ticket: 0 }]);
  const [restart, setrestart] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [Load, setLoad] = useState(false);
  const [spiner, setSpiner] = useState(false);
  const admin = localStorage.getItem("admin");
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

  function onClose() {
    props.hidefunc();
  }

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };
  useEffect(() => {
    if (i18n.language == "fa") {
      setfa(true);
    } else {
      setfa(false);
    }
  }, []);

  useEffect(() => {
    setComment(props.comments);
    setLoad(true);
  }, [Load]);

  useEffect(() => {
    axios.get("api/userslist?count=1000").then(async (results) => {
      let context = [];
      await props.comments.map(async (val, key) => {
        let users = await results.data.data.find((user) => {
          return user.id == val.user_id;
        });
        const timer = isfa
          ? moment(val.updated_at).locale("fa").format("YYYY/M/D - H:m:s")
          : moment(val.updated_at).format("YYYY/M/D - H:m:s");
        context.push(
          <ExampleComment1
            isfa={isfa}
            reply={replyfunc}
            key={key}
            name={users.first_name + " " + users.last_name}
            id={users.id}
            date={timer}
            email={users.email}
            message={val.body}
          ></ExampleComment1>
        );
      });
      setrestart(context);
    });
    console.log(props.data);
  }, [refresh, isfa]);

  //tag
  const answered = () => {
    axios
      .put("api/ticket/" + props.data.key + "/?status=In Progress")
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
      message.error(t("message.comment"));
      return false;
    }
    setSpiner(true);
    axios
      .put("api/ticket/" + props.data.key + "/", {
        content: content,
      })
      .then((res) => {
        if (res.status === 202 || res.status === 201) {
          setContent("");
          props.changeComment();
          setLoad(true);
          setSpiner(false);
          setTimeout(() => {
            setrefresh((prev) => !prev);
          }, 3000);
          message.success(t("message.send-comment"));
        } else {
          message.error(t("message.failed-comment"));
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

  let elem, attr, classStatus, elemTicketrm;
  if (spiner) {
    attr = { disabled: true };
    elem = <Spin />;
  }

  elemTicketrm = (
    <>
      <p className={isfa ? "comment-fa" : "comment"}>
        {" "}
        <b> {t("add.comment")} </b>{" "}
      </p>{" "}
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex  of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />{" "}
      <br />
      <Button onClick={deletingTicket} className="btn-drwer btn-cancel ">
        {" "}
        {t("done.done")}{" "}
      </Button>{" "}
      <Button
        onClick={onClose}
        style={{ marginRight: 8 }}
        className="btn-cancel btn-drwer"
      >
        {" "}
        {t("cancel.cancel")}{" "}
      </Button>{" "}
      <Button {...attr} onClick={submited} className="btn-drwer">
        {" "}
        {t("send.send")} {elem}{" "}
      </Button>{" "}
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
  } else if (props.data.status[0] === "new" || props.data.status[0] === "New") {
    classStatus = "ant-tag-green";
  }
  let adminElement = "";
  if (admin == 1) {
    adminElement = (
      <div>
        <span>
          <Button onClick={() => answered("")} className="ant-tag-blue">
            {" "}
            {t("filters.In Progress")}{" "}
          </Button>{" "}
        </span>{" "}
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
                <ArrowLeftOutlined className="icon-back" onClick={onClose} />{" "}
                <span className="ticket-id">
                  {" "}
                  {t("action.ticket")} {props.data.key}{" "}
                </span>{" "}
              </p>{" "}
              <span>
                <span className="openTicket__subject">
                  {" "}
                  {props.data.subject}{" "}
                </span>{" "}
              </span>{" "}
              <span>
                <span className={"ant-tag " + classStatus}>
                  {" "}
                  {t(`filters.${props.data.status[0]}`)}{" "}
                </span>{" "}
              </span>{" "}
              <span className="font-span">
                <div className={isfa ? "PersianNo" : "EnglishNo"} style={{marginTop:"10px"}}>
                  {" "}
                  {t("action.create")}{" "}
                  {isfa
                    ? moment(props.date).locale("fa").format("YYYY/M/D")
                    : moment(props.date).format("YYYY/M/D")}{" "}
                </div>{" "}
                <div className={isfa ? "req" : "req-fa"}>
                  {" "}
                  {t("action.req")} {props.data.requester}{" "}
                </div>{" "}
                <span className="color-name"> </span>{" "}
              </span>{" "}
            </div>{" "}
            {adminElement}{" "}
          </div>,
        ]}
        width={720}
        onClose={onClose}
        visible={props.open}
        bodyStyle={{ paddingBottom: 30 }}
        footer={<div> {elemTicketrm} </div>}
      >
        {" "}
        {restart}{" "}
      </Drawer>{" "}
    </>
  );
}

export default OpenTicket;
