import "./login.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout, message, Row, Col, Form, Input, Button, Checkbox } from "antd";
import imgLogin from "../../assets/login.jpg";
import imagelogin from "../../assets/MS.svg";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import axios from "../../axios";

const { Content } = Layout;
function Login() {
  const [check, setcheck] = useState(false);
  const [form] = Form.useForm();
  const storage = localStorage.getItem("login");
  useEffect(() => {
    const storageObj = JSON.parse(storage);
    if (storage !== null) {
      form.setFieldsValue({
        email: storageObj.email,
        password: storageObj.password,
      });
    }
  }, []);
  const history = useHistory();
  const handleFormSubmit = (values) => {
    const email = values.email,
      pass = values.password;
    axios
      .post("api/login/", {
        email: email,
        password: pass,
      })
      .then((res) => {
        if (res.status === 200) {
          if (check === true) {
            localStorage.setItem(
              "login",
              JSON.stringify({ // change object to json
                email: email,
                password: pass,
              })
            );
          }
          return res.data;
        } else if (res.status === 401) {
          message.error("email or password is invalid");
        }
      })
      .then((res) => {
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.id);
        localStorage.setItem("admin", res.admin);
        localStorage.setItem("username", res.name);
        history.replace("/dashboard");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  const register = () => {
    message.success("Welcome to register a new user");
    history.push("/register");
  };
  const forgotpass = () => {
    message.success("You can change your password");
    history.push("./forgot");
  };

  return (
    <>
      <Helmet>
        <title>SAMA - Login Page</title>
      </Helmet>

      <Layout>
        <Content className="login__layout">
          <Row>
            <Col className="item_center" span={12}>
              <div>
                <img src={imagelogin} className="imglogo " alt="" />
              </div>
              <p className="p-size">Welcome Back</p>

              <Form
                name="normal_login"
                className="login-form"
                form={form}
                initialValues={{
                  remember: true,
                }}
                onFinish={handleFormSubmit}
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
                      prefix={
                        <MailOutlined className="ant-icon site-form-item-icon " />
                      }
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    className="ant-input-size"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                      {
                        min: 8,
                      }
                    ]}
                  >
                    <Input.Password
                      prefix={
                        <LockOutlined className="ant-icon site-form-item-icon" />
                      }
                      type="password"
                      placeholder="Password "
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button submit-login"
                    >
                      Login
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <div className="width-style">
                      <Form.Item name="remember" noStyle>
                        <Checkbox
                          onChange={(e) => {
                            setcheck(e.target.checked);
                          }}
                        >
                          Remember me
                        </Checkbox>
                      </Form.Item>
                      <a className="login-form-forgot" onClick={forgotpass}>
                        Forgot password
                      </a>
                    </div>
                  </Form.Item>
                  <Form.Item className="botoom-border">
                    Don&apos;t have an account?{" "}
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
            </Col>
            <Col className="login__right-image" span={12}>
              <div>
                <img
                  src={imgLogin}
                  className="grayscale loginImag"
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

export default Login;
