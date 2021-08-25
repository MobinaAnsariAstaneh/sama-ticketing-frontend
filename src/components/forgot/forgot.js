import "./forgot.css";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Layout, message, Row, Col, Form, Input, Button } from "antd";
import {
  MailOutlined,
  FileProtectOutlined,
  LockOutlined,
} from "@ant-design/icons";
import imgLogin from "../../assets/login.jpg";
import imagelogin from "../../assets/MS.svg";
import { Helmet } from "react-helmet";
import axios from "../../axios";

const { Content } = Layout;

function Forgot() {
  const history = useHistory();
  const location = useLocation();
  const [stge, setstage] = useState(false);
  useEffect(() => {
    if (location.search.match("token")){
      setstage(true);
    }
  }, []);
  const register = () => {
    message.success("Welcome to register a new user");
    history.push("./register");
  };

  
  const onFinished = (values) => {
    axios
      .post(
        "api/password_reset_email",
        {
          email: values.email,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setstage(true);
          message.success("Email was successfully sent to you");
          history.push("./email");
        }
        return res.data;
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err.message));
  };

  const onFinished2 = (values) => {
    const token = location.search.split("&")[0].split("=")[1];
    const email = location.search.split("&")[1].split("=")[1];
    if(values.password !== values.confirm_password){
      return message.error("password and confirm password doesn't match");
    }
    
    axios
      .post(
        "api/reset_password",
        {
          token: token,
          email: email,
          password: values.password,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setstage(false);
        }
        return res.data;
      })
      .then(() => {
        message.success("Your password changed successfully");
        history.push("./login");
      })
      .catch((err) => console.log(err.message));
  };

  let form = (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinished}
    >
      <div className="flex-space">
        <Form.Item
          className="ant-input-size"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: 'email',
              message: "Your email is invalid!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="ant-icon site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="login-form-button-purple submit-forgot">
            Submit
          </Button>
        </Form.Item>

        <Form.Item className="botoom-border">
          Any other way?{" "}
          <a className="a-style" onClick={register}>
            Register
          </a>
          <br />
          Having an issue?{" "}
          <a className="a-style" href={"./guide"}>
            Contact us
          </a>
        </Form.Item>
      </div>
    </Form>
  );
  if (stge) {
    form = (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinished2}
      >
        <div className="flex-space">
        <Form.Item
            className="ant-input-size"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
              {
                min: 8,
              }
            ]}
          >
            <Input.Password
              type="new password"
              className="ant-icon"
              prefix={<LockOutlined />}
              placeholder="new password"
            />
          </Form.Item>
          <Form.Item
            className="ant-input-size"
            name="confirm_password"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              {
                min: 8,
              }
            ]}
          >
            <Input.Password
              type="confirm password"
              className="ant-icon"
              prefix={<FileProtectOutlined />}
              placeholder="confirm password"
            />
          </Form.Item>
          

          <Form.Item>
            <Button htmlType="submit" className="login-form-button-purple submit-forgot">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }

  return (
    <>
      <Helmet>
        <title>SAMA - Forgotten Password Page</title>
      </Helmet>
      <Layout>
        <Content>
          <Row>
            <Col className="item_center" span={12}>
              <div>
                <img src={imagelogin} className="imglogo" alt="" />
              </div>
              <p className="p-size">Forgotten Password ?</p>
              <p className="note-size">
                Enter your email to reset your password
              </p>

              {form}
            </Col>
            <Col className="login__right-image" span={12}>
              <div>
                <img
                  src={imgLogin}
                  className="rgbimage loginImag"
                  width="100%"
                  height="721vh"
                  alt=""
                />
                <p className="para">
                  <span>SAMA WEB</span>
                  <div>
                    A good platform for communication between employers and the
                    programming team
                  </div>
                </p>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default Forgot;
