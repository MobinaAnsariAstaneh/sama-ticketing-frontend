import './profile.css';
import Head from "../header/header";
import { useState, useEffect } from "react";
import { Layout, message, Row, Col, Input, Button} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import Gravatar from "react-gravatar";
import axios from "../../axios";

const { Header, Content } = Layout;

function Profile() {
  const [user, setuser] = useState({
    name: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [formdata, setformdata] = useState({
    pass: "",
    confimpass: "",
    oldpass: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (formdata.pass !== formdata.confimpass) {
      message.error("password and confirm password not equal");
      return false;
    }
    const senddata = {
      old_password: formdata.oldpass,
      password: formdata.pass,
    };

    console.log(senddata);
    axios
      .post("api/changepassword/", senddata)
      .then((res) => {
        console.log(res)
        setformdata({
          email: "",
          name: "",
          lastname: "",
          pass: "",
          confimpass: "",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    axios
      .put("api/user/")
      .then((res) => {
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
          name: user.username,
          email: user.email,
          last_name: user.last_name,
          first_name: user.first_name,
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
                <form
                  onSubmit={(e) => {
                    submitHandler(e);
                  }}
                >
                  <h2>User Information change</h2>
                  <Input
                    size="large"
                    value={formdata.name}
                    onChange={(e) => {
                      setformdata((prev) => {
                        return { ...prev, name: e.target.value };
                      });
                    }}
                    placeholder="Name"
                    className="ant-icon"
                    prefix={<UserOutlined />}
                  />
                  <br />
                  <br />
                  <Input
                    value={formdata.lastname}
                    onChange={(e) => {
                      setformdata((prev) => {
                        return { ...prev, lastname: e.target.value };
                      });
                    }}
                    size="large"
                    placeholder="Last Name"
                    className="ant-icon"
                    prefix={<UserOutlined />}
                  />
                  <br />
                  <br />
                  <Input
                    value={formdata.oldpass}
                    onChange={(e) => {
                      setformdata((prev) => {
                        return { ...prev, oldpass: e.target.value };
                      });
                    }}
                    size="large"
                    placeholder="old password"
                    className="ant-icon"
                    prefix={<LockOutlined />}
                  />
                  <br />
                  <br />
                  <Input
                    value={formdata.pass}
                    onChange={(e) => {
                      setformdata((prev) => {
                        return { ...prev, pass: e.target.value };
                      });
                    }}
                    size="large"
                    placeholder="Password"
                    className="ant-icon"
                    prefix={<LockOutlined />}
                  />
                  <br />
                  <br />
                  <Input
                    value={formdata.confimpass}
                    onChange={(e) => {
                      setformdata((prev) => {
                        return { ...prev, confimpass: e.target.value };
                      });
                    }}
                    size="large"
                    placeholder="Confirm Password"
                    className="ant-icon"
                    prefix={<LockOutlined />}
                  />
                  <br />
                  <br />
                  <div className="btn-position">
                    <Button
                      className="button"
                      key="submit"
                      htmlType="submit"
                      ghost
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default Profile;
