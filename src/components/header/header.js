import { React, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Clock from "../clock/clock";
import "./header.css";
import {
  PlusSquareOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Layout, Row, Col, Menu, Dropdown, message, Popconfirm } from "antd";
import image from "../../assets/MS_header.svg";
import AddTicket from "../add ticket/add-ticket";
import { useTranslation } from "react-i18next";
// import i18n from "../../utilies/i18n";

const { Header , Sider} = Layout;

function Head(props) {
  const history = useHistory();
  const [newTicket, setNewTicket] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const username = localStorage.getItem("username");
  const { t } = useTranslation();
  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  //   // change direrction persian -> rtl / english -> ltr
  // };

  const routeChange = () => {
    message.success(t('message.guide'));
    history.push("/guide");
  };
  const dashboard = () => {
    message.success(t('message.dashboard'));
    history.push("/dashboard");
  };
  const Profile = () => {
    message.success(t('message.profile'));
    history.push("/profile");
  };
  const logOut = () => {
    message.success(t('message.logout'));
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("auth");
    history.push("/login");
  };
  const cancel = () => {
    message.success(t('message.cancel-logout'));
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={Profile}>{t('page.profile')}</a>
      </Menu.Item>
      <Menu.Item key="2">

      <Popconfirm 
      title={t('message.confirm-logout')} 
      okText={t('message.yes')}
      cancelText={t('message.no')}
      onConfirm={logOut}
      onCancel={cancel}
      >
          <a href={"./login"}>{t('page.logout')}</a>
      </Popconfirm>
        {/* <Popconfirm
          title= {t('message.confirm-logout')}
          onConfirm={logOut}
          onCancel={cancel}
        >
          <a href={"./login"}>{t('page.logout')}</a>
        </Popconfirm> */}
      </Menu.Item>
    </Menu>
  );
  let newTicketElem = "";
  let guide = "";
  let userElem = (
    <Link to="/login">
      <a className="login">{t('page.login')}</a>
    </Link>
  );

  let btnAdmin = "";
  if (localStorage.getItem("admin") == 1) {
    btnAdmin = (
      <Link to="/admin" title={t('page.admin')}>
        <a className="link">
          <IdcardOutlined twoToneColor="white" style={{ paddingRight:"16px" }}  />
        </a>
      </Link>
    );
  }

  const token = localStorage.getItem("auth");
  if (token) {
    guide = (
      <Link to="/guide" title={t('page.guide')}>
        <a className="link">
          <QuestionCircleOutlined
            style={{ paddingRight:"5px" }}
            onClick={routeChange}
          />
        </a>
      </Link>
    );
    newTicketElem = (
      <abbr title={t('page.addTicket')}>
          <PlusSquareOutlined
            style={{ paddingRight:"16px" }}
            onClick={() => {
              setNewTicket(true);
            }}
          />
      </abbr>
    );

    userElem = (
      <Dropdown
        overlay={menu}
        visible={dropdown}
        onVisibleChange={(e) => {
          setDropdown(e);
        }}
        placement="bottomRight"
      >
        <span className="username-style">
          {username}
          <UserOutlined
            style={{ fontSize: "20px", padding: "0px 0px 0px 3px" }}
          />
        </span>
      </Dropdown>
    );
  }

  return (
    <>
      <Layout className="layout">
        <div className="ant-image-header1"></div>
        <Header className="ant-layout-header1">
          <Row wrap={false} className="display">
            <Col flex="none" className="ant-col1">
              <div className="left_header">
                <Link to="/dashboard" title={t('page.dashboard')}>
                  <img
                    className="dashboard_logo"
                    src={image}
                    width="120px"
                    height="120px"
                    alt="logo"
                    onClick={dashboard}
                  />
                </Link>
                <Clock />
              </div>
            </Col>
            <Col className="ant-col2">
            <Sider 
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={broken => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
              className="slider-position"
      >
              {" "}
              <div className="icons-list">
                {newTicketElem}
                {btnAdmin}
                {guide}
                {userElem}
              </div>
              </Sider>
            </Col>
          </Row>
        </Header>
      </Layout>
      <AddTicket
        changeTicket={() => {
          props.changeTicket();
        }}
        open={newTicket}
        hidefunc={() => {
          setNewTicket(false);
        }}
      />
    </>
  );
}
export default Head;
