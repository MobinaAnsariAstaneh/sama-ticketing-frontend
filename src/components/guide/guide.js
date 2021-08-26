import "./guide.css";
import Head from "../header/header";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Layout, Card, Col, Row, Modal, Typography} from "antd";
import {
  PhoneOutlined,
  SendOutlined,
  MailOutlined,
  InstagramOutlined,
  SkypeOutlined,
} from "@ant-design/icons";
import Maghami from "../../assets/Maghami.jpg";
import Ansari from "../../assets/Ansari.jpg";
import front from "../../assets/Front_End.jpg";
import back from "../../assets/Back_End.png";
import imagelogin from "../../assets/MS.png";

const { Header, Content } = Layout;
const { Paragraph } = Typography;

function Guide() {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(
    "All ways of virtual communication with the programming group"
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

  const handleCheckOut1 = () => {
    setIsModalVisible1(false);
  };
  const handleCheckOut2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const handleOk = () => {
    setModalText(
      "All ways of virtual communication with the programming group"
    );
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Helmet>
        <title>SAMA - Guide Page</title>
      </Helmet>
      <Layout className="layout">
        <Header>
          <Head />
        </Header>

        <Content style={{ padding: "0 100px" , marginBottom:"15px"}}>
          <div className="site-layout-content">
            <div>
              <h2 className="goal">Team&apos;s Goal : </h2>
              <h3 className="goal_context">
                This is a platform for communication between the employer and
                the company&apos;s programming team. In this context,
                programmers are required to support projects implemented by
                them, during the project or after delivery to the client. If the
                employer encounters any questions during the project, he can
                create his question on this site as a task or issue and
                determine its priority level. The programming team will evaluate
                the ticket at the first opportunity and solve it.
              </h3>
            </div>
            <div className="or"></div>

            <div className="programmers">
              <button className=" btn custom-btn" onClick={showModal1}>
              <span>programmers</span>
              </button>
              <Modal
                title="programmers information"
                visible={isModalVisible1}
                onOk={handleCheckOut1}
                onCancel={handleCancel1}
                width={1000}
                centered
                >
                <Row className="card-center">
                  <Col flex={1}>
                    <Card
                      title="Front-end Developer"
                      bordered={false}
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="Mobina Ansari" src={Ansari} />}
                    >
                      <h4>
                        <a className="programmer_info" href={"https://www.linkedin.com/in/mobina-ansari-astaneh-431981213/" }>Mobina Ansari Astaneh</a>
                      </h4>
                      <InstagramOutlined
                        style={{ padding: "1px 6px 4px 0px" }}
                      />
                      Instagram : <br />
                      <Paragraph copyable>m_ansari_astaneh</Paragraph>
                      <SkypeOutlined style={{ padding: "1px 6px 4px 0px" }} />
                      Skype : <br />
                      <Paragraph copyable>live:.cid.4d6d9e1e3adbb47a</Paragraph>
                    </Card>
                  </Col>
                  <Col flex={1}>
                    <Card
                      title="Front-end Developer"
                      bordered={false}
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="Sepideh Maghami" src={Maghami} />}
                    >
                      <h4>
                        <a  className="programmer_info" href={"https://www.linkedin.com/in/sepideh-darban-maghami-7bbb4b1b9/"}>Sepideh Darban Maghami</a>
                      </h4>
                      <InstagramOutlined
                        style={{ padding: "1px 6px 4px 0px" }}
                      />
                      Instagram : <br />
                      <Paragraph copyable>sepideh.dm</Paragraph>
                      <SkypeOutlined style={{ padding: "1px 6px 4px 0px" }} />
                      Skype : <br />
                      <Paragraph copyable>live:sepideh.1378.dm</Paragraph>
                    </Card>
                  </Col>
                </Row>
              </Modal>
            </div>
            <div className="ProgrammingLanguages">
              <button className=" btn custom-btn" onClick={showModal2}>
               <span>Programming Languages</span>
              </button>
              <Modal
                title="Programming Languages"
                visible={isModalVisible2}
                onOk={handleCheckOut2}
                onCancel={handleCancel2}
                width={1000}
              >
                <Row className="card-center">
                  <Col flex={1}>
                    <Card
                      title="Front-end Programming Languages"
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
                      title="Back-end Programming Languages"
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
              <button onClick={showModal} className=" btn custom-btn">
               <span> How to contact with supporter?</span>
              </button>
              <Modal
                title="Contact with us : "
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <p>{modalText}</p> <br />
                <MailOutlined style={{ padding: "1px 6px 4px 0px", color: "#3fa7d6"  }} />
                Email : <br />
                <Paragraph copyable className="copy">mobinaansariit@gmail.com</Paragraph>
                <Paragraph copyable className="copy">sepideh@gmail.com</Paragraph>
                <PhoneOutlined style={{ padding: "1px 6px 4px 0px", color: "#3fa7d6"  }} />
                      Phone Number :{" "}
                      <Paragraph copyable className="copy">+98 915 445 0822</Paragraph>
                      <Paragraph copyable className="copy">+98 915 066 0935</Paragraph>
                      <SendOutlined style={{ padding: "1px 6px 4px 0px" , color: "#3fa7d6" }} />
                Telegram : <br />
                <Paragraph copyable className="copy">@M_Ansari_Astaneh</Paragraph>
                <Paragraph copyable className="copy">@S_darban_maghami</Paragraph>
              </Modal>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default Guide;