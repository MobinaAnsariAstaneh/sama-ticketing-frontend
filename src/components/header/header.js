import { React, useState,useEffect } from "react";
import { useHistory, Link , useLocation } from "react-router-dom";
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
import i18n from "../../utilies/i18n";

const { Header , Sider} = Layout;

function Head(props) {
  const history = useHistory();
  const [newTicket, setNewTicket] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const username = localStorage.getItem("username");
  const { t } = useTranslation();
  const [isfa, setfa] = useState(false);
  const Detectfa = (lng) => {
    if (lng === "fa") setfa(true);
    else setfa(false);
  };

  i18n.on("languageChanged", (lng) => {
    Detectfa(lng);
  });
  
  useEffect(()=>{
    if(i18n.language == 'fa'){
      setfa(true) 
    }
    else{
      setfa(false)
    }
  },[])
  
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

  const token = localStorage.getItem("auth");
  if (token) {
    guide = (
      <Link to="/guide" title={t('page.guide')}>
        <a className="link">
          <QuestionCircleOutlined
            className={isfa ? " rtl-question": "ltr-question" }
            onClick={routeChange}
          />
        </a>
      </Link>
    );
    newTicketElem = (
      <abbr title={t('page.addTicket')}>
          <PlusSquareOutlined
            style={{ paddingRight:"15px" }}
            onClick={() => {
              setNewTicket(true);
            }}
          />
      </abbr>
    );

    if (localStorage.getItem("admin") == 1) {
      btnAdmin = (
        <Link to="/admin" title={t('page.admin')}>
          <a className="link">
            <IdcardOutlined twoToneColor="white" style={{ padding:"0px 13px 0px 2px" }}  />
          </a>
        </Link>
      );
    }

    userElem = (
      <Dropdown
        overlay={menu}
        visible={dropdown}
        onVisibleChange={(e) => {
          setDropdown(e);
        }}
        placement="bottomRight"
      >
        <span className={isfa ? " rtl-username-style": "ltr-username-style" }>
          {username}
          <UserOutlined
            className={isfa ? " rtl-user": "ltr-user" }
          />
        </span>
      </Dropdown>
    );
  }
  useEffect(() => {
  }, []);
  var clickHave=()=>window.scrollTo({
    top: 1000, 
    left: 0, 
    behavior: 'smooth' 
});
  var clickdo=()=>window.scrollTo({
      top: 550, 
      left: 0, 
      behavior: 'smooth' 
  });
  const location=useLocation();
  let elemGuide=""
  , classimage=""
  if(location.pathname === "/guide"){
    classimage="ant-image-guide"
    elemGuide=(<>
      <Link className="link linkGuide1" onClick={clickdo}>
        {t("goal.goal")}
      </Link>
      <Link className="link linkGuide2"  onClick={clickHave}>
        {t("goal.SAMA")}
      </Link>
    </>
    )
  }

  return (
    <>
      <Layout className="layout" >
        <div className={"ant-image-header1 "+classimage}></div>
        <Header className="ant-layout-header1 ">
          <Row wrap={false} className= {isfa ? "display rtl" : "display "}>
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
            <Col className={isfa ? "rtl-ant-col2":"ltr-ant-col2" }>
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
              <div className={isfa ? "icons-list-rtl" : "icons-list-ltr"}>
                {elemGuide}
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
