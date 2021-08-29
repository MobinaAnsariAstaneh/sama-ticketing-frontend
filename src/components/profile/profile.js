import "./profile.css";
import Head from "../header/header";
import { useState, useEffect } from "react";
import { 
  Layout,
  message, 
  Row, 
  Col, 
  Input, 
  Form, 
  Button, 
  Menu,
  Dropdown
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import Gravatar from "react-gravatar";
import axios from "../../axios";
import English from "../../assets/english.svg";
import Persian from "../../assets/persian.svg";
import chooselanguage from "../../assets/chooselanguage.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../utilies/i18n";

const { Header, Content,Footer } = Layout;

function Profile() {
  const [form] = Form.useForm();
  const [change, setchange] = useState(true);
   const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // change direrction persian -> rtl / english -> ltr
  };
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
          message.success(t('message.success-update'));
        } else message.error(t('message.failed-update'));
      })
      .catch(() => {
        message.error(t('message.bug-update'));
      });
  };
  useEffect(() => {
    axios
      .get("api/user")
      .then((res) => {
        if (res.status === 200 || res.status === 202) {
          return res.data;
        } else {
          message.error(t('message.bug-profile'));
        }
      })
      .then((user) => {
        setuser({
          name: user.first_name,
          lastname: user.last_name,
          email: user.email,
          identity_number: user.first_name,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [change]);
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
        <title>{t('title.profile')}</title>
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
                  <h2>{t('register.profile')}</h2>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        min: 2,
                        max: 15,
                        message: t('message.name-limit')
                      },
                    ]}
                  >
                    <Input
                      placeholder={t('register.first')}
                      type="text"
                      className="ant-icon"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="LastName"
                    
                    rules={[
                      {
                        min: 3,
                        max: 20,
                        message: t('message.last-limit')
                      },
                    ]}
                  >
                    <Input
                      placeholder={t('register.last')}
                      type="text"
                      className="ant-icon"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        min: 8,
                        message: t('message.password-limit')
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder={t('register.pass')}
                      type="password"
                      className="ant-icon"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm_password"
                    rules={[
                      {
                        min: 8,
                        message: t('message.confirm-password-limit')
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder={t('register.conf-pass')}
                      className="ant-icon"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button button btn-profile"
                  >
                    {t('register.save')}
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>

          {/* bilingual */}
     <Footer style={{ textAlign: 'center' }}>
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button className="btn-footer">  
            <img src={chooselanguage} alt="Choose Language" />
            {t("footer.language")}
          </Button>
        </Dropdown>
      </Footer>
      </Layout>
    </>
  );
}

export default Profile;
