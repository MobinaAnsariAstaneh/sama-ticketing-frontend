import { Layout } from "antd";
import { Row, Col } from "antd";
import imgLogin from "../../assets/login.jpg";
import imagelogin from "../../assets/MS.svg";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";

const { Content } = Layout;
const onFinish = (values) => {
  console.log("Received values of form: ", values);
  console.log(values);
};

function Register() {
  return (
    <>
      <Helmet>
        <title>Ticketing - Register Page</title>
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
                name="normal_login"
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
                    name="confirm-password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password again!",
                      },
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
                      className="login-form-button "
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
