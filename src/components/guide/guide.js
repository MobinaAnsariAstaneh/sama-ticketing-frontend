import "./guide.css";
import Head from "../header/header";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Layout,
  Card, 
  Col, 
  Row, 
  Modal, 
  Typography,
  Menu, 
  Dropdown,
  Button
} from "antd";
import {
  PhoneOutlined,
  SendOutlined,
  MailOutlined,
  DownOutlined
} from "@ant-design/icons";
import Maghami from "../../assets/Maghami.jpg";
import Ansari from "../../assets/Ansari.jpg";
import front from "../../assets/Front_End.jpg";
import back from "../../assets/Back_End.png";
import imagelogin from "../../assets/MS.png";
import English from "../../assets/english.svg";
import Persian from "../../assets/persian.svg";
import chooselanguage from "../../assets/chooselanguage.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../utilies/i18n";
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // change direrction persian -> rtl / english -> ltr
  };

const { Header, Content ,Footer } = Layout;
const { Paragraph } = Typography;

function Guide() {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const {t} = useTranslation();
  const [isfa , setfa] = useState(false);
  const Detectfa = (lng) => {
    if (lng === 'fa')
       setfa(true);
    else
       setfa(false);
  }

  i18n.on('languageChanged', (lng) => {
    Detectfa(lng);
  });
  

  const menu1 = (
    <Menu>
      <Menu.Item key="0">
        <a className={isfa ? 'TA-fa' : 'TA'}>{t('TA.discrete')}</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a className={isfa ? 'TA-fa' : 'TA'}>{t('TA.algebra')}</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a className={isfa ? 'TA-fa' : 'TA'}>{t('TA.network')}</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a className={isfa ? 'TA-fa' : 'TA'}>{t('TA.logic')}</a>
      </Menu.Item>
      <Menu.Item key="4">
        <a className={isfa ? 'TA-fa' : 'TA'}>{t('TA.software')}</a>
      </Menu.Item>
      <Menu.Item key="5">
        <a className={isfa ? 'TA-fa' : 'TA'}>{t('TA.iot')}</a>
      </Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu>
      <Menu.Item key="0">
        <a className={isfa ? 'TA-fa' : 'TA'}>{t('TA.discrete')}</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a className={isfa ? 'TA-fa' : 'TA'}>{t('TA.logic')}</a>
      </Menu.Item>
    </Menu>
  );

  const showModal = () => {
    setVisible(true);
  };

  const showModal1 = () => {
    setIsModalVisible1(true);
  };
  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel = () => {
    console.log(t('message.cancel'));
    setVisible(false);
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
        <title>{t('title.guide')}</title>
      </Helmet>
      <Layout className="layout">
        <Header>
          <Head />
        </Header>

        <Content style={{ padding: "0 100px" , marginBottom:"15px"}}>
          <div className="site-layout-content">
            <div>
              <h2 className={isfa ? 'goal-fa' : 'goal'}>{t('goal.goal')}</h2>
              <h3 className={isfa ? 'goal_context-fa' : 'goal_context'}>
              {t('goal.goal-content')}
              </h3>
            </div>
            <div className="or"></div>

            <div className="programmers">
              <button className=" btn custom-btn" onClick={showModal1}>
              <span>{t('programmer.programmers')}</span>
              </button>
              <Modal
                title={t('programmer.info')}
                visible={isModalVisible1}
                onCancel={handleCancel1}
                width={1000}
                centered
                footer={
                   <Button onClick={handleCancel1} >{t('register.close')}</Button>
                }
                >
                <Row className="card-center">
                  <Col flex={1}>
                    <Card
                      title={t('programmer.front')}
                      bordered={false}
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="Mobina Ansari" src={Ansari} />}
                    >
                      <h4>
                        <a className="programmer_info" href={"https://www.linkedin.com/in/mobina-ansari-astaneh-431981213/" }>{t('programmer.mobina')}</a>
                      </h4>
                      <div className={isfa ? 'icon-field-fa' : 'icon-field'}>
                      <img className={isfa ? 'info-margin-fa' : 'info-margin'} src="https://img.icons8.com/ios-filled/25/4a90e2/student-center.png"/>              
                      {t('programmer.degree')}<br />
                      </div>
                      <Paragraph><a href="http://www.sanjesh.org/">{t('programmer.bachelor')}</a></Paragraph>
                      <div className={isfa ? 'icon-field-fa' : 'icon-field'}>
                       <img className={isfa ? 'info-margin-fa' : 'info-margin'} src="https://img.icons8.com/ios-filled/25/4a90e2/university.png"/>
                      {t('programmer.uni')}<br />
                      </div>
                      <Paragraph><a href="https://www.sadjad.ac.ir/">{t('programmer.sadjad')}</a></Paragraph>
                      <div className={isfa ? 'icon-field-fa' : 'icon-field'}>
                      <img className={isfa ? 'info-margin-fa' : 'info-margin'} src="https://img.icons8.com/ios-filled/25/4a90e2/teacher.png"/>
                      {t('programmer.academic')}<br />
                      </div>
                    <Dropdown overlay={menu1} trigger={['click']}>
                        <a className="ant-dropdown-link">
                        {t('programmer.ta')}<DownOutlined />
                        </a>
                      </Dropdown>
                      </Card>
                  </Col>
                  <Col flex={1}>
                    <Card
                      title={t('programmer.front')}
                      bordered={false}
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="Sepideh Maghami" src={Maghami} />}
                    >
                      <h4>
                        <a  className="programmer_info" href={"https://www.linkedin.com/in/sepideh-darban-maghami-7bbb4b1b9/"}>{t('programmer.sepid')}</a>
                      </h4>
                      <div className={isfa ? 'icon-field-fa' : 'icon-field'}>
                      <img className={isfa ? 'info-margin-fa' : 'info-margin'} src="https://img.icons8.com/ios-filled/25/4a90e2/student-center.png"/>              
                      {t('programmer.degree')}<br />
                      </div>
                      <Paragraph><a href="http://www.sanjesh.org/">{t('programmer.bachelor')}</a></Paragraph>
                    <div className={isfa ? 'icon-field-fa' : 'icon-field'}>
                    <img className={isfa ? 'info-margin-fa' : 'info-margin'} src="https://img.icons8.com/ios-filled/25/4a90e2/university.png"/>
                      {t('programmer.uni')}<br />
                    </div>
                      <Paragraph><a href="https://www.sadjad.ac.ir/">{t('programmer.sadjad')}</a></Paragraph>
                      <div className={isfa ? 'icon-field-fa' : 'icon-field'}>
                      <img className={isfa ? 'info-margin-fa' : 'info-margin'} src="https://img.icons8.com/ios-filled/25/4a90e2/teacher.png"/>
                    {t('programmer.academic')}<br />
                      </div>
                    <Dropdown overlay={menu2} trigger={['click']}>
                        <a className="ant-dropdown-link">
                        {t('programmer.ta')}<DownOutlined />
                        </a>
                      </Dropdown>
                    </Card>
                  </Col>
                </Row>
              </Modal>
            </div>
            <div className="ProgrammingLanguages">
              <button className=" btn custom-btn" onClick={showModal2}>
               <span>{t('programmering-language.programmering-language')}</span>
              </button>
              <Modal
                title={t('programmering-language.title')}
                visible={isModalVisible2}
                onCancel={handleCancel2}
                width={1000}
                footer={
                   <Button onClick={handleCancel2} >{t('register.close')}</Button>
                }
              >
                <Row className="card-center">
                  <Col flex={1}>
                    <Card
                      title={t('programmering-language.front')}
                      bordered={false}
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="Front-end" src={front} />}
                      className="language-left "
                    >
                      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
                        <img
                          className="language-margin"
                          src="https://img.icons8.com/color/30/000000/html-5--v1.png"
                        />
                        HTML
                      </a>
                      <br />
                      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
                        <img
                          className="language-margin"
                          src="https://img.icons8.com/color/30/000000/css3.png"
                        />
                        CSS
                      </a>
                      <br />
                      <a href="https://www.javascript.com/">
                        <img
                          className="language-margin"
                          src="https://img.icons8.com/color/30/000000/javascript--v1.png"
                        />
                        JavaScript
                      </a>
                      <br />
                      <a href="https://reactjs.org/">
                        <img
                          className="language-margin"
                          src="https://img.icons8.com/office/30/000000/react.png"
                        />
                        React
                      </a>
                    </Card>
                  </Col>
                  <Col flex={1}>
                    <Card
                      title={t('programmering-language.back')}
                      bordered={false}
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="Back-end" src={back} />}
                      className="language-left "
                    >
                      <a href="https://www.php.net/">
                        <img
                          className="language-margin"
                          src="https://img.icons8.com/offices/30/000000/php-logo.png"
                        />
                        PHP
                      </a>
                      <br />
                      <a href="https://laravel.com/">
                        <img
                          className="language-margin"
                          src="https://img.icons8.com/fluency/30/000000/laravel.png"
                        />
                        Laravel
                      </a>
                    </Card>
                  </Col>
                </Row>
              </Modal>
            </div>
            <div className="or"></div>
            <img src={imagelogin} alt="" className="logo"/>
            <div className="center">
              <button onClick={showModal} className=" btn custom-btn" style={{marginBottom:"-20px"}}>
               <span>{t('contact.contact')}</span>
              </button>
              <Modal
                title= {t('contact.us')}
                visible={visible}
                onCancel={handleCancel}
                footer={
                   <Button onClick={handleCancel}>{t('register.close')}</Button>
                }
              >

                <div className={isfa ? 'icon-field-fa' : 'icon-field'}>
                <MailOutlined style={{ padding: "1px 6px 4px 5px", color: "#3fa7d6"  }} />
                {t('contact.email')}
                </div>
                <br />
                <Paragraph copyable className="copy">mobinaansariit@gmail.com</Paragraph>
                <Paragraph copyable className="copy">sepideh@gmail.com</Paragraph>
                <div className={isfa ? 'icon-field-fa' : 'icon-field'}>
                <PhoneOutlined style={{ padding: "1px 6px 4px 5px", color: "#3fa7d6"  }} />
                  {t('contact.phone')}
                </div>
                      <Paragraph copyable className="copy">+98 915 445 0822</Paragraph>
                      <Paragraph copyable className="copy">+98 915 066 0935</Paragraph>
                <div className={isfa ? 'icon-field-fa' : 'icon-field'}>
                <SendOutlined style={{ padding: "1px 6px 4px 5px" , color: "#3fa7d6" }} />
                {t('contact.telegram')}
                </div>
                <br />
                <Paragraph copyable className="copy">@M_Ansari_Astaneh</Paragraph>
                <Paragraph copyable className="copy">@S_darban_maghami</Paragraph>
              </Modal>
            </div>
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

export default Guide;