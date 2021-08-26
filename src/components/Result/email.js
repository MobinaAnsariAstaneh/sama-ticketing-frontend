import React from "react";
import "antd/dist/antd.css";
import "./email.css";
import email from "../../assets/email.png";

const Email = () => {
  return (
    <div className="card">
      <img src={email} className="email"></img>
      <h2 className="notif">
        Email was <b className="successfully">successfully</b> sent to you :)
        <br />
        Check your Email and join to us
      </h2>
    </div>
  );
};

export default Email;
