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
  const [user, setuser] = useState({
    name: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [formdata, setformdata] = useState({
    pass: "",
    confimpass: "",
  });
  const validetion = (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.confim_password) {
      message.error("password and confirm password not equal");
      return false;
    }
  };
  const submitHandler = (id) => {
    const senddata = {
      name: formdata.name,
      lastname: formdata.lastname,
      oldpass: formdata.confimpass,
      password: formdata.pass,
    };

    console.log(senddata);
    axios
      .put("api/user/" + id, senddata)
      .then(() => {
        setformdata({
          name: "",
          lastname: "",
          pass: "",
          confimpass: "",
        });
      })
      .catch(() => {
        message.error("Your information didn't update");
      });
  };
  useEffect(() => {
    axios
      .put("api/user/")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return res.data;
        } else {
          message.error("something wrong to fetch data user");
        }
      })
      .then((res) => {
        return res.results;
      })
      .then((result) => {
        const user = result.find((arr) => {
          return arr.username === localStorage.getItem("username");
        });
        setuser({
          name: user.name,
          lastname: user.lastname,
          oldpass: user.confimpass,
          password: user.pass,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
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
                <p className="user-name">{user.name}</p>
                <p>{user.first_name}</p>
                <p>{user.last}</p>
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
                      value={formdata.name}
                      onChange={(e) => {
                        setformdata((prev) => {
                          return { ...prev, name: e.target.value };
                        });
                      }}
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
                      value={formdata.lastname}
                      onChange={(e) => {
                        setformdata((prev) => {
                          return { ...prev, lastname: e.target.value };
                        });
                      }}
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
                      value={formdata.pass}
                      onChange={(e) => {
                        setformdata((prev) => {
                          return { ...prev, pass: e.target.value };
                        });
                      }}
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
                      value={formdata.confimpass}
                      onChange={(e) => {
                        setformdata((prev) => {
                          return { ...prev, confimpass: e.target.value };
                        });
                      }}
                      placeholder="Confirm Password"
                      className="ant-icon"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button button"
                    onSubmit={(e) => {
                      validetion(e);
                    }}
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
