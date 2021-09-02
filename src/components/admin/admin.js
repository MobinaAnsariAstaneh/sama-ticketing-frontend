import Head from "../header/header";
import "./admin.css";
import {
  Radio,
  Modal,
  Input,
  Form,
  Space,
  Popconfirm,
  Pagination,
  Layout,
  Breadcrumb,
  Table,
  Row,
  Col,
  Button,
  message,
  Dropdown,
  Menu
} from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Bar } from "react-chartjs-2";
import axios from "../../axios";
import { useTranslation } from "react-i18next";
import i18n from "../../utilies/i18n";
import English from "../../assets/english.svg";
import Persian from "../../assets/persian.svg";
import chooselanguage from "../../assets/chooselanguage.svg";
import moment from 'jalali-moment';

const { Header, Content,Footer } = Layout; // Layout , Header, Content, Footer for ant design

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function Admin() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // change direrction persian -> rtl / english -> ltr
  };

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

useEffect(()=>{
  if(i18n.language == 'fa'){
    setfa(true) 
  }
  else{
    setfa(false)
  }
},[])


  const [data1, setdata1] = useState([]);
  const [chnage, setchange] = useState(true);
  const [curentData, setcurentData] = useState();
  const [redirect, setredirect] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [chart, setchart] = useState({
    User: 0,
    Admin: 0,
    New: 0,
    Open: 0,
    In_Progress: 0,
    Answered: 0,
    Done: 0,
  });
  const [formdata, setformdata] = useState({
    email: "",
    created_at: "",
    firstname: "",
    lastname: "",
    pass: "",
    confimpass: "",
    superuser: false,
  });
  const [url, seturl] = useState("api/userslist/");
  var username = localStorage.getItem("username");

  const data3 = {
    labels: [t('filters.admin'), t('filters.user')],
    datasets: [
      {
        label: t('filters.users'),
        data: [chart.Admin, chart.User],
        backgroundColor: ["#ED4C67", "#12CBC4"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: [t('filters.new'), t('filters.open'), t('filters.Answered'), t('filters.In Progress'), t('filters.Done')],
    datasets: [
      {
        label: t('filters.tickets'),
        data: [
          chart.New,
          chart.Open,
          chart.Answered,
          chart.In_Progress,
          chart.Done,
        ],
        backgroundColor: [
          " #0ead69",
           "#fca311",
           "#5c0099",
           "#05299e",
           "#d00000",
         ],
         borderColor: [
           "#fff",
           "#fff",
           "#fff",
           "#fff",
           "#fff",
         ],
        borderWidth: 1,
      },
    ],
  };

  const deletUser = (id) => {
    console.log("id", id);
    axios
      .delete("api/deleteUser?id=" + id)
      .then((res) => {
        if (res.status == 201 || res.status == 202 || res.status == 200) {
          setchange(prev => !prev)
          message.success(t('message.delete_user'));
        } else message.success(t('message.remove_user'));
      })
      .catch(() => {
        message.error(t('message.bug_remove'))
      });
  };

  const columns = [
    {
      title: t("admin.id"),
      dataIndex: "id",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: t("admin.first"),
      dataIndex: "firstname",
    },
    {
      title: t("admin.last"),
      dataIndex: "lastname",
    },
    {
      title: "email",
      dataIndex: "email",
      // eslint-disable-next-line react/display-name
      render: (text) => <a style={{ color: "#3699FF" }}> {text} </a>,
    },
    {
      title: "created_at",
      dataIndex: "created_at",
      // eslint-disable-next-line react/display-name
      render: function (props) {
        return (
          <>
            <span style={{ color: "#16960b" }} className={isfa ? 'PersianNo' : ''}  dangerouslySetInnerHTML={{ __html: props }}></span>
          </>
        );
      }
    },
    {
      title: t("admin.super"),
      dataIndex: "superuser",
      // eslint-disable-next-line react/display-name
      render: (text) => (
        <a style={{ color: "#f11919" }}>
          
          {text ? t("message.yes") : t("message.no")}
        </a>
      ),
    },
    {
      title: t("admin.action"),
      dataIndex: "action",
      // eslint-disable-next-line react/display-name
      render: function (id, record) {
        return (
          <>
            <Space size="middle" style={{ color: "#0967c5" }}>
              <Popconfirm
                title={t("admin.remove")}
                okText={t('message.yes')}
                cancelText={t('message.no')}
                onConfirm={() => {
                  deletUser(record.id);
                }}
              >
                <a> {t("admin.remove-user")} </a>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];
  var arr = [];
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setcurentData(res.data.total);
        if (res.status === 200 ) {
          return res.data.data;
        } else {
          setredirect(true);
        }
      })
      .then((result) => {
        arr = [];
        const resul = [...result];
        let itsme = "";
        resul.map((val) => {
          itsme = "";
          if (val.username === username) {
            itsme = t("admin.you");
          }
          var create_time = isfa==false ? moment(val.created_at).format("YYYY/M/D <br/> H:m:s") : moment(val.created_at).locale("fa").format("YYYY/M/D <br/> H:m:s")
          arr.push({
            id: val.id,
            firstname: val.first_name + itsme,
            lastname: val.last_name,
            email: val.email,
            superuser: val.admin == 1 ? true : false,
            created_at: create_time
          });
        });
        setdata1(arr);
      })
      .catch((err) => {
        console.log(err.message);
        setredirect(false);
      });
  }, [chnage , isfa]);

  useEffect(() => {
    axios
      .get("api/report")
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          message.error("Not reported");
        }
      })
      .then((res) => {
        console.log(res);
        setchart({
          New: res["new-tickets"],
          Open: res["open-tickets"],
          Answered: res["answered-tickets"],
          In_Progress: res["progress-tickets"],
          Done: res["done-tickets"],
          User: res["normal-users"],
          Admin: res["super-users"],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const senddata = {
      email: formdata.email,
      first_name: formdata.name,
      last_name: formdata.lastname,
      admin: formdata.superuser,
      password: formdata.pass,
      password_confirm: formdata.confimpass
    };
    axios
      .post("api/register", senddata)
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          setmodalOpen(false)
          message.success(t("message.newuser_add"))
          return res.data;
        }
        else{
          message.error(t("message.newuser_fail"))
        }
      })
      .then(() => {
        setformdata({
          email: "",
          firstname: "",
          lastname: "",
          pass: "",
          confimpass: "",
          superuser: false,
        });
        setchange((prev) => !prev);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const changePage = (current) => {
    seturl("api/userslist?page=" + current);
    setchange((prev) => !prev);
  };

  let redirectelem = ""; //!
  let permission = localStorage.getItem("admin");
  if (permission == 0) {
    setredirect(true);
  }
  if (redirect === true) {
    redirectelem = <Redirect to="/" />;
  }

  
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
      
      {redirectelem}
      <Helmet>
        <title> {t("title.admin")} </title>
      </Helmet>
      <Layout className="layout">
        <Header>
          <Head
            changeTicket={() => {
              setchange((prev) => !prev);
            }}
          />
        </Header>
        <Content className={isfa ? "rtl-admin" : "ltr-admin"}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Row wrap={false} className="display">
              <Col flex="none">
                <div>
                  <Button
                    type="primary"
                    onClick={() => setmodalOpen(true)}
                    size={20}
                  >
                    {t("admin.new")}
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="search-table">
                  <Pagination
                    defaultCurrent={1}
                    onChange={changePage}
                    total={curentData}
                  />
                </div>
              </Col>
            </Row>
          </Breadcrumb>
          <div className="site-layout-content">
            <Table
              columns={columns}
              dataSource={data1}
              scroll={{ x: "calc(650px + 50%)" }}
            />
          </div>
        </Content>
        <div className="chart">
          <div className="chartContainer">
            <div className="titleChart"> {t("admin.chart-tickets")} </div>
            <Bar data={data2} options={options} />
          </div>
        </div>
        <div className="chart">
          <div className="chartContainer">
            <div className="titleChart"> {t("admin.chart-users")} </div>
            <Bar data={data3} options={options} />
          </div>
        </div>
        <Modal
          title={[<h2 key="1"> {t("admin.new")} </h2>]}
          centered
          visible={modalOpen}
          onCancel={() => setmodalOpen(false)}
          footer={[
            <Button
              key="back"
              onClick={() => setmodalOpen(false)}
              className="btn-cancel btn-modal"
            >
              {t("admin.cancel")}
            </Button>,
            <Button
              key="submit"
              onClick={(e) => submitHandler(e)}
              className="btn-modal"
            >
              {t("admin.add")}
            </Button>,
          ]}
        >
          <Form
             name="normal_login"
            form={form}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t("message.email"),
                },
                {
                  type: "email",
                  message: t("message.invalid"),
                },
              ]}
            >
              <Input
                value={formdata.email}
                onChange={(e) => {
                  setformdata((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
                size="large"
                placeholder={t("register.email")}
                className="ant-icon"
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: t("message.first"),
                },
                {
                  min: 2,
                  max: 15,
                  message: t("message.name-limit"),
                },
              ]}
            >
              <Input
                size="large"
                value={formdata.name}
                onChange={(e) => {
                  setformdata((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
                placeholder={t("register.first")}
                className="ant-icon"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="LastName"
              rules={[
                {
                  required: true,
                  message: t("message.last"),
                },
                {
                  min: 2,
                  max: 20,
                  message: t("message.last-limit"),
                },
              ]}
            >
              <Input
                value={formdata.lastname}
                onChange={(e) => {
                  setformdata((prev) => {
                    return { ...prev, lastname: e.target.value };
                  });
                }}
                size="large"
                placeholder={t("register.last")}
                className="ant-icon"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("message.pass"),
                },
                {
                  min: 8,
                  message: t("message.password-limit"),
                },
              ]}
            >
              <Input.Password
                value={formdata.pass}
                onChange={(e) => {
                  setformdata((prev) => {
                    return { ...prev, pass: e.target.value };
                  });
                }}
                size="large"
                placeholder={t("register.pass")}
                className="ant-icon"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: t("message.conf-pass"),
                },
                {
                  min: 8,
                  message: t("message.confirm-password-limit"),
                },
              ]}
            >
              <Input.Password
                value={formdata.confimpass}
                onChange={(e) => {
                  setformdata((prev) => {
                    return { ...prev, confimpass: e.target.value };
                  });
                }}
                size="large"
                placeholder={t("register.conf-pass")}
                className="ant-icon"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <div className="b-border">
              <span className="m-r"> {t("admin.super")} </span>
              <Radio.Group
                onChange={(e) => {
                  setformdata((prev) => {
                    return { ...prev, superuser: e.target.value };
                  });
                }}
                value={formdata.superuser}
              >
                <Radio value={true}> yes </Radio>
                <Radio value={false}> no </Radio>
              </Radio.Group>
            </div>
            <br />
          </Form>
        </Modal>
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

export default Admin;
