import "./register.css";
import { Layout, Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useHistory } from 'react-router-dom';
import imgLogin from "../../assets/login.jpg";
import imagelogin from "../../assets/MS.svg";
import { Helmet } from "react-helmet";
import axios from "../../axios";

const { Content } = Layout;

function Register() {
  const history = useHistory();
  const onFinish = (values) => {
    axios.post("api/register", {
      first_name: values.name,
      last_name: values.LastName,
      email: values.email,
      password: values.password,
      password_confirm: values.confirm_password,
    })
    .then(()=>{
      history.push("./login");
    })
    console.log("Received values of form: ", values);
    console.log(values);
  };
  
  return (
    <>
      <Helmet>
        <title>SAMA - Register Page</title>
      </Helmet>

      <Layout>
        <Content>
          <Row>
            <Col className="item_center" span={12}>
              <div>
                <img src={imagelogin} className="imglogo" alt="" />
              </div>
              <p className="p-size">Create Account</p>
              <p note-size>Already have an Account ?</p>
              <p>
                <a href={"./login"}>Sign In</a>
              </p>

              <Form
                name="normal_register"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <div className="flex-space">
                  <Form.Item
                    className="ant-input-size"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your First Name!",
                      },
                      {
                        min: 2,
                        max: 15
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      prefix={
                        <UserOutlined className="ant-icon site-form-item-icon" />
                      }
                      placeholder="First Name"
                    />
                  </Form.Item>

                  <Form.Item
                    className="ant-input-size"
                    name="LastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Last Name!",
                      },
                      {
                        min: 2,
                        max: 20,
                      }
                    ]}
                  >
                    <Input
                      className="ant-input-size"
                      prefix={
                        <UserOutlined className="ant-icon site-form-item-icon" />
                      }
                      placeholder="Last Name"
                    />
                  </Form.Item>

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
                  <Form.Item
                    className="ant-input-size"
                    name="confirm_password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password again!",
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
                      type="confirm-password"
                      placeholder="Confirm password "
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button submit-register"
                    >
                      Create Account
                    </Button>
                  </Form.Item>

                  <Form.Item className="botoom-border">
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

export default Register;
