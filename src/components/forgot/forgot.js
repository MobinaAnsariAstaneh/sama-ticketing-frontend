import "./forgot.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  const register = () => {
    message.success("Register page");
    history.push("./register");
  };

  const [stge, setstage] = useState(false);
  const onFinished = (values) => {
    axios
      .post(
        "api/password_reset_email",
        {
          email: values.email,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setstage(true);
          message.success(res.data.message);
        }
        return res.data;
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err.message));
  };

  const onFinished2 = (values) => {
    axios
      .post(
        "api/reset_password",
        {
          token: values.token,
          email: values.email,
          password: values.password,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setstage(false);
        }
        return res.data;
      })
      .then((result) => {
        alert(JSON.stringify(result));
        console.log(result);
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
          ]}
        >
          <Input
            prefix={<MailOutlined className="ant-icon site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="login-form-button-purple">
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
            name="token"
            rules={[
              {
                required: true,
                message: "Please input your token!",
              },
            ]}
          >
            <Input
              type="token"
              className="ant-icon"
              prefix={<FileProtectOutlined />}
              placeholder="token"
            />
          </Form.Item>
          <Form.Item
            className="ant-input-size"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              type="email"
              className="ant-icon"
              prefix={<FileProtectOutlined />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            className="ant-input-size"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password
              type="new password"
              className="ant-icon"
              prefix={<LockOutlined />}
              placeholder="new password"
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="login-form-button-purple">
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
                  className="loginImag"
                  width="100%"
                  height="721vh"
                  alt=""
                />
                <p className="para">
                  <span>
                    Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Egestas purus viverra
                    accumsan in nisl nisi. Arcu cursus vitae congue mauris
                    rhoncus aenean vel elit scelerisque. In egestas erat
                    imperdiet sed euismod nisi porta lorem mollis.{" "}
                  </span>
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
