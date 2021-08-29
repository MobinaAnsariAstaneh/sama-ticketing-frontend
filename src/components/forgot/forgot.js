import "./forgot.css";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Layout, message, Row, Col, Form, Input, Button,Menu,Dropdown } from "antd";
import {
  MailOutlined,
  FileProtectOutlined,
  LockOutlined,
} from "@ant-design/icons";
import imgLogin from "../../assets/login.jpg";
import imagelogin from "../../assets/MS.svg";
import { Helmet } from "react-helmet";
import axios from "../../axios";
import { useTranslation } from "react-i18next";
import English from "../../assets/english.svg";
import Persian from "../../assets/persian.svg";
import chooselanguage from "../../assets/chooselanguage.svg";
import i18n from "../../utilies/i18n";

const { Content } = Layout;


function Forgot() {
  const history = useHistory();
  const location = useLocation();
  const [stge, setstage] = useState(false);
   const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    if (location.search.match("token")){
      setstage(true);
    }
  }, []);
  const register = () => {
    message.success(t('message.register'));
    history.push("./register");
  };

  
  const onFinished = (values) => {
    axios
      .post(
        "api/password_reset_email",
        {
          email: values.email,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setstage(true);
          message.success(t('message.success-email'));
          history.push("./email");
        }
        return res.data;
      })
      .then((result) => {
        console.log(result);
      })
      .catch(() => console.log(t('message.failed-email')));
  };

  const onFinished2 = (values) => {
    const token = location.search.split("&")[0].split("=")[1];
    const email = location.search.split("&")[1].split("=")[1];
    if(values.password !== values.confirm_password){
      return message.error(t('message.comparePassword'));
    }
    
    axios
      .post(
        "api/reset_password",
        {
          token: token,
          email: email,
          password: values.password,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setstage(false);
        }
        return res.data;
      })
      .then(() => {
        message.success(t('message.changed'));
        history.push("./login");
      })
      .catch(() => console.log(t('message.Unchanged')));
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
              message: t('message.input-email'),
            },
            {
              type: 'email',
              message: t('message.invalid'),
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="ant-icon site-form-item-icon" />}
            type="email"
            placeholder={t('password.email')}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="login-form-button-purple submit-forgot">
            {t('password.submit')}
          </Button>
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
            name="password"
            rules={[
              {
                required: true,
                message: t('message.newPass'),
              },
              {
                min: 8,
                message: t('message.password-limit')
              }
            ]}
          >
            <Input.Password
              type="new password"
              className="ant-icon"
              prefix={<LockOutlined />}
              placeholder={t('password.new')}
            />
          </Form.Item>
          <Form.Item
            className="ant-input-size"
            name="confirm_password"
            rules={[
              {
                required: true,
                message: t('message.confirmPass'),
              },
              {
                min: 8,
                message: t('message.confirm-password-limit')
              }
            ]}
          >
            <Input.Password
              type="confirm password"
              className="ant-icon"
              prefix={<FileProtectOutlined />}
              placeholder={t('password.confirm')}
            />
          </Form.Item>
        
          <Form.Item>
            <Button htmlType="submit" className="login-form-button-purple submit-forgot">
              {t('password.submit')}
            </Button>
          </Form.Item>
         </div>
      </Form>
    );
  }

return (
    <>
      <Helmet>
        <title>{t('title.forgot')}</title>
      </Helmet>
      <Layout>
        <Content>
          <Row>
            <Col className="item_center" span={12}>
              <div>
                <img src={imagelogin} className="imglogo" alt="" />
              </div>
              <p className="p-size">{t('password.forgot')}</p>
              <p className="note-size">
                {t('password.reset')}
              </p>

              {form}
            </Col>
            <Col className="login__right-image" span={12}>
              <div>
                <img
                  src={imgLogin}
                  className="rgbimage loginImag"
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

export default Forgot;
