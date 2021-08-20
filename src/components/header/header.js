import {
  PlusSquareOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Layout } from "antd";
import { Row, Col } from "antd";
import image from "../../assets/MS_header.svg";
import { Menu, Dropdown, message } from "antd";
import AddTicket from "../add ticket/add-ticket";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Popconfirm } from "antd";
const { Header } = Layout;

function Head(props) {
  const history = useHistory();
  const [newTicket, setNewTicket] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const username = localStorage.getItem("username");

  const routeChange = () => {
    message.success("Guide page");
    history.push("/guide");
  };
  const dashboard = () => {
    message.success("Dashboard page");
    history.push("/dashboard");
  };
  const Profile = () => {
    message.success("profile page");
    history.push("/profile");
  };
  const logOut = () => {
    message.success("Log out");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("auth");
    history.push("/login");
  };
  const cancel = () => {
    message.error("Log out canceled");
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={Profile}>Profile</a>
      </Menu.Item>
      <Menu.Item key="2">
        <Popconfirm
          title="Sure to logout?"
          onConfirm={logOut}
          onCancel={cancel}
        >
          <a href={"./login"}>Log out</a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Layout className="layout">
        <Header>
          <Row wrap={false} className="display">
            <Col flex="none">
              <div>
                <img
                  src={image}
                  width="40px"
                  height="40px"
                  alt="logo"
                  onClick={dashboard}
                />
              </div>
            </Col>
            <Col>
              {" "}
              <div className="icons-list">
                <PlusSquareOutlined
                  style={{ padding: "0 14px" }}
                  onClick={() => {
                    setNewTicket(true);
                  }}
                />
                <QuestionCircleOutlined
                  style={{ padding: "0 13px" }}
                  onClick={routeChange}
                />
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
