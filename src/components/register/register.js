import "./register.css";
import { Layout, Row, Col, Form, Input, Button ,Menu,Dropdown } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useHistory } from 'react-router-dom';
import imgLogin from "../../assets/login.jpg";
import imagelogin from "../../assets/MS.svg";
import { Helmet } from "react-helmet";
import axios from "../../axios";
import English from "../../assets/english.svg";
import Persian from "../../assets/persian.svg";
import chooselanguage from "../../assets/chooselanguage.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../utilies/i18n";

function Register() {
  const history = useHistory();
  const { Content } = Layout;
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // change direrction persian -> rtl / english -> ltr
  };

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
        <title>{t('title.register')}</title>
      </Helmet>

      <Layout>
        <Content>
          <Row>
            <Col className="item_center" span={12}>
              <div>
                <img src={imagelogin} className="imglogo" alt="" />
              </div>
              <p className="p-size">{t('register.account')}</p>
              <p note-size>{t('register.have-account')}</p>
              <p>
                <a href={"./login"}>{t('register.signIn')}</a>
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
                        message: t('message.first'),
                      },
                      {
                        min: 2,
                        max: 15,
                        message: t('message.name-limit')
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      prefix={
                        <UserOutlined className="ant-icon site-form-item-icon" />
                      }
                      placeholder= {t('register.first')}
                    />
                  </Form.Item>

                  <Form.Item
                    className="ant-input-size"
                    name="LastName"
                    rules={[
                      {
                        required: true,
                        message: t('message.last'),
                      },
                      {
                        min: 2,
                        max: 20,
                        message: t('message.last-limit')
                      }
                    ]}
                  >
                    <Input
                      className="ant-input-size"
                      prefix={
                        <UserOutlined className="ant-icon site-form-item-icon" />
                      }
                      placeholder={t('register.last')}
                    />
                  </Form.Item>

                  <Form.Item
                    className="ant-input-size"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: t('message.email'),
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
                      placeholder={t('register.email')}
                    />
                  </Form.Item>

                  <Form.Item
                    className="ant-input-size"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: t('message.pass'),
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
                      placeholder={t('register.pass')}
                    />
                  </Form.Item>
                  <Form.Item
                    className="ant-input-size"
                    name="confirm_password"
                    rules={[
                      {
                        required: true,
                        message: t('message.conf-pass'),
                      },
                      {
                        min: 8,
                        message: t('message.confirm-password-limit')
                      }
                    ]}
                  >
                    <Input.Password
                      prefix={
                        <LockOutlined className="ant-icon site-form-item-icon" />
                      }
                      type="confirm-password"
                      placeholder={t('register.conf-pass')}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button submit-register"
                    >
                      {t('register.account')}
                    </Button>
                  </Form.Item>
                 
                   <Form.Item className="botoom-border">
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

export default Register;
