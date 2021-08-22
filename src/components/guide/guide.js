import "./guide.css";
import Head from "../header/header";
import { Layout, Breadcrumb } from "antd";
import { Helmet } from "react-helmet";
import { Card, Col, Row } from "antd";
import React, { useState } from "react";
import { Modal, Button } from "antd";
import { PhoneOutlined, SendOutlined, MailOutlined } from "@ant-design/icons";
import Maghami from "../../assets/Maghami.jpg";
import Ansari from "../../assets/Ansari.jpg";
import front from "../../assets/Front_End.jpg";
import back from "../../assets/Back_End.png";
import imagelogin from "../../assets/MS_logo.svg";
import { Typography } from "antd";

const { Header, Content } = Layout;
const { Paragraph } = Typography;

function Guide() {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

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

  return (
    <>
      <Helmet>
        <title>SAMA - Guide Page</title>
      </Helmet>
      <Layout className="layout">
        <Header>
          <Head />
        </Header>

        <Content style={{ padding: "0 100px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item style={{ fontWeight: 'bold' }}>Guide</Breadcrumb.Item> */}
          </Breadcrumb>
          <div className="site-layout-content">
            <div>
              <h4 className="goal">Team&apos;s Goal : </h4>
              <h5 className="goal_context">
                This is a platform for communication between the employer and
                the company&apos;s programming team. In this context,
                programmers are required to support projects implemented by
                them, during the project or after delivery to the client. If the
                employer encounters any questions during the project, he can
                create his question on this site as a task or issue and
                determine its priority level. The programming team will evaluate
                the ticket at the first opportunity and solve it.
              </h5>
            </div>
            <div className="or"></div>

            <div className="programmers">
              <Button className="btn_purple" onClick={showModal1}>
                programmers
              </Button>
              <Modal
                title="programmers information"
                visible={isModalVisible1}
                onOk={handleCheckOut1}
                onCancel={handleCancel1}
                width={1000}
                className="m-t"
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
                      <h6>
                        <a href={"./profile"}>Mobina Ansari Astaneh</a>
                      </h6>
                      <MailOutlined style={{ padding: "1px 6px 4px 0px" }} />
                      Email :{" "}
                      <Paragraph copyable>mobinaansariit@gmail.com</Paragraph>
                      <PhoneOutlined style={{ padding: "1px 6px 4px 0px" }} />
                      Phone Number :{" "}
                      <Paragraph copyable>+98 915 445 0822</Paragraph>
                      <SendOutlined style={{ padding: "1px 6px 4px 0px" }} />
                      Telegram :{" "}
                      <Paragraph copyable>@M_Ansari_Astaneh</Paragraph>
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
                      <h6>
                        <a href={"./profile"}>Sepideh Darban Maghami</a>
                      </h6>
                      <MailOutlined style={{ padding: "1px 6px 4px 0px" }} />
                      Email : <Paragraph copyable>sepideh@gmail.com</Paragraph>
                      <PhoneOutlined style={{ padding: "1px 6px 4px 0px" }} />
                      Phone Number :{" "}
                      <Paragraph copyable>+98 915 066 0935</Paragraph>
                      <SendOutlined style={{ padding: "1px 6px 4px 0px" }} />
                      Telegram :{" "}
                      <Paragraph copyable>@S_darban_maghami</Paragraph>
                    </Card>
                  </Col>
                </Row>
              </Modal>
            </div>
            <div className="ProgrammingLanguages">
              <Button className="btn_purple" onClick={showModal2}>
                Programming Languages
              </Button>
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
            <img src={imagelogin} alt="" />
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default Guide;
