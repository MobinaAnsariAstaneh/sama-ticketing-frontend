import { React, useState } from "react";
import { useHistory, Link } from "react-router-dom";
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

const { Header } = Layout;

function Head(props) {
  const history = useHistory();
  const [newTicket, setNewTicket] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const username = localStorage.getItem("username");

  const routeChange = () => {
    message.success("Welcome to contact us");
    history.push("/guide");
  };
  const dashboard = () => {
    message.success("Welcome to your Dashboard");
    history.push("/dashboard");
  };
  const Profile = () => {
    message.success("Welcome to to your profile");
    history.push("/profile");
  };
  const logOut = () => {
    message.success("successfully logged out");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("auth");
    history.push("/login");
  };
  const cancel = () => {
    message.success("You are still with us");
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={Profile}>Profile</a>
      </Menu.Item>
      <Menu.Item key="2">
        <Popconfirm
          title="do you want to get off this page??"
          onConfirm={logOut}
          onCancel={cancel}
        >
          <a href={"./login"}>Log out</a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );
  let newTicketElem = "";
  let guide = "";
  let userElem = (
    <Link to="/login">
      <a className="login">login</a>
    </Link>
  );

  let btnAdmin = "";
  if (localStorage.getItem("admin") == 1) {
    btnAdmin = (
      <Link to="/admin" title="Admin">
        <a className="link">
          <IdcardOutlined
            twoToneColor="white"
            style={{ padding: "0 14px" }}
          />
        </a>
      </Link>
    );
  }

  const token = localStorage.getItem("auth");
  if (token) {
    guide = (
      <Link to="/guide" title="Guide">
      <a className="link">
      <QuestionCircleOutlined
        style={{ padding: "0 13px" }}
        onClick={routeChange}
      />
      </a>
      </Link>
    );
    newTicketElem = (
      <Link to="/add ticket" title="Add Ticket">
      <a className="link">
      <PlusSquareOutlined
        style={{ padding: "0 14px" }}
        onClick={() => {
          setNewTicket(true);
        }}
      />
      </a>
      </Link>
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
            style={{ fontSize: "20px", padding: "0px 0px 0px 12px" }}
          />
        </span>
      </Dropdown>
    );
  }

  return (
    <>
      <Layout className="layout">
        <Header>
          <Row wrap={false} className="display">
            <Col flex="none">
              <div>
              <Link to="/dashboard" title="Dashboard">
                <img
                  src={image}
                  width="40px"
                  height="40px"
                  alt="logo"
                  onClick={dashboard}
                />
                </Link>
              </div>
            </Col>
            <Col>
              {" "}
              <div className="icons-list">
                {newTicketElem}
                {btnAdmin}  
                {guide}
                {userElem}
              </div>
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
