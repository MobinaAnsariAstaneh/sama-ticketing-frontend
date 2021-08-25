import "./profile.css";
import Head from "../header/header";
import { useState, useEffect } from "react";
import { Layout, message, Row, Col, Input, Form, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import Gravatar from "react-gravatar";
import axios from "../../axios";

const { Header, Content } = Layout;

function Profile() {
  const [form] = Form.useForm();
  const [change, setchange] = useState(true);
  const [user, setuser] = useState({
    identity_number: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const submitHandler = (value) => {
    const senddata = {
      first_name: value.name,
      last_name: value.LastName,
      password_confirm: value.confirm_password,
      password: value.password,
    };
    console.log("value", value);
    console.log("data which sent to backend",senddata);
    const id_user = localStorage.getItem("id");
    axios
      .put("api/user/" + id_user, senddata)
      .then((res) => {
        if (res.status == 200 || res.status == 202) {
          setchange((prev) => !prev);
          message.success("Perfect, Your information updated successfully :)");
        } else message.error("Your personal information has not been updated");
      })
      .catch(() => {
        message.error("Your personal information has not been updated");
      });
  };
  useEffect(() => {
    axios
      .get("api/user")
      .then((res) => {
        if (res.status === 200 || res.status === 202) {
          return res.data;
        } else {
          message.error("something wrong to fetch user's data");
        }
      })
      .then((user) => {
        setuser({
          name: user.first_name,
          lastname: user.last_name,
          email: user.email,
          identity_number: user.id,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [change]);
  return (
    <>
      <Helmet>
        <title>SAMA - Profile Page</title>
      </Helmet>
      <Layout className="layout">
        <Header>
          <Head />
        </Header>

        <Content style={{ padding: "0 100px" }}>
          <div className="site-layout-content">
            <Row style={{ marginTop: "8%" }}>
              <Col flex={2} style={{ margin: "50px", marginBottom: "0px" }}>
                <div className="avatar">
                  <Gravatar
                    email={user.email}
                    size={120}
                    className="CustomAvatar-image"
                  />
                </div>
                <p className="user-name">{user.identity_number}</p>
                <p>{user.name + " " + user.lastname}</p>
                <p>{user.email}</p>
              </Col>

              <Col flex={1} className="left-border"></Col>
              <Col
                flex={4}
                className="form-con"
                style={{ margin: "50px", marginBottom: "0px" }}
              >
                <Form
                  name="normal_login"
                  className="login-form"
                  form={form}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={submitHandler}
                >
                  <h2>User Information change</h2>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your First Name!",
                      },
                      {
                        min: 2,
                        max: 15,
                      },
                    ]}
                  >
                    <Input
                      placeholder="First name"
                      type="text"
                      className="ant-icon"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="LastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Last Name!",
                      },
                      {
                        min: 3,
                        max: 20,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Last Name"
                      type="text"
                      className="ant-icon"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                      {
                        min: 8,
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      type="password"
                      className="ant-icon"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm_password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password again!",
                      },
                      {
                        min: 8,
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm Password"
                      className="ant-icon"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button button"
                  >
                    Save
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default Profile;
