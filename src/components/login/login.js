import "./login.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout, message, Row, Col, Form, Input, Button, Checkbox,Dropdown,Menu} from "antd";
import imgLogin from "../../assets/login.jpg";
import imagelogin from "../../assets/MS.svg";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import axios from "../../axios";
import { useTranslation } from "react-i18next";
import English from "../../assets/english.svg";
import Persian from "../../assets/persian.svg";
import chooselanguage from "../../assets/chooselanguage.svg";
import i18n from "../../utilies/i18n";

const { Content } = Layout;
function Login() {
  const [check, setcheck] = useState(false);
  const [form] = Form.useForm();
   const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // change direrction persian -> rtl / english -> ltr
  };
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
          message.error(t('message.invalid-login'));
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
    message.warn(t('message.joinUs'));
    history.push("/register");
  };
  const forgotpass = () => {
    message.success(t('message.forgotten'));
    history.push("./forgot");
  };

  const menu = (
    <Menu>
      <Menu.Item>
      <li onClick={() => changeLanguage("en")}>
            <img src={English} alt="English" />
            {t("footer.english")}
       </li>
      </Menu.Item>
      <Menu.Item>
      
      <li onClick={() => changeLanguage("fa")}>
            <img src={Persian} alt="Persian" />
            {t("footer.persian")}
      </li>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Helmet>
        <title>{t('title.login')}</title>
      </Helmet>

      <Layout>
        <Content className="login__layout">
          <Row>
            <Col className="item_center" span={12}>
              <div>
                <img src={imagelogin} className="imglogo " alt="" />
              </div>
              <p className="p-size">{t('login.welcome')}</p>

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
                        message: t('message.input-email'),
                      },
                      {
                        type: 'email',
                        message: t('message.invalid'),
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <MailOutlined className="ant-icon site-form-item-icon " />
                      }
                      placeholder={t('password.email')}
                    />
                  </Form.Item>
                  <Form.Item
                    className="ant-input-size"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: t('message.password')
                      },
                      {
                        min: 8,
                        message: t('message.password-limit')
                      }
                    ]}
                  >
                    <Input.Password
                      prefix={
                        <LockOutlined className="ant-icon site-form-item-icon" />
                      }
                      type="password"
                      placeholder={t('password.password')}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button submit-login"
                    >
                      {t('page.login')}
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
                          {t('login.remember')}
                        </Checkbox>
                      </Form.Item>
                      <a className="login-form-forgot" onClick={forgotpass}>
                        {t('login.forgot')}
                      </a>
                    </div>
                  </Form.Item>
                  <Form.Item className="botoom-border">
                    {t('links.way')}{"  "}
                    <a className="a-style" onClick={register}>
                      {t('links.register')}
                    </a>
                    <br />
                    {t('links.issue')}{" "}
                    <a className="a-style" href={"./guide"}>
                      {t('links.contact')}
                    </a>
                  </Form.Item>
                        {/* Bilingual */}
                <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button className="btn-footer">  
            <img src={chooselanguage} alt="Choose Language" />
            {t("footer.language")}
          </Button>
        </Dropdown>
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
                  <span>{t('company.company')}</span>
                  <div>
                    {t('company.goal')}
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
