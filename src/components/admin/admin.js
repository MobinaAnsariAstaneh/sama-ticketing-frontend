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
} from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Bar } from "react-chartjs-2";
import axios from "../../axios";
import { useTranslation } from 'react-i18next';
// import i18n from "../../utilies/i18n";

  
  // const [isfa , setfa] = useState(false);
  // const Detectfa = (lng) => {
  //   if (lng === 'fa')
  //      setfa(true);
  //   else
  //      setfa(false);
  // }

  // i18n.on('languageChanged', (lng) => {
  //   Detectfa(lng);
  // });

const { Header, Content } = Layout; // Layout , Header, Content, Footer for ant design
const data = {
  labels: ["comments", "tickets", "users"],
  datasets: [
    {
      label: "done",
      data: [1, 6, 4],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "new",
      data: [9, 1, 8],
      backgroundColor: "#79EC7D",
    },
  ],
};

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
  const {t} = useTranslation();
  const [data1, setdata1] = useState([]);
  const [chnage, setchange] = useState(true);
  const [curentData, setcurentData] = useState();
  const [redirect, setredirect] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [formdata, setformdata] = useState({
    email: "",
    firstname: "",
    lastname: "",
    pass: "",
    confimpass: "",
    superuser: false,
    staff: true,
  });
  const [url, seturl] = useState("api/users/");
  var token = localStorage.getItem("token");
  var username = localStorage.getItem("username");
  const deletUser = () => {};
  const columns = [
    {
      title: t('admin.id'),
      dataIndex: "id",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: t('admin.username'),
      dataIndex: "username",
    },
    {
      title: t('admin.first'),
      dataIndex: "firstname",
    },

    {
      title: t('admin.last'),
      dataIndex: "lastname",
    },
    {
      title: "email",
      dataIndex: "email",
      // eslint-disable-next-line react/display-name
      render: (text) => <a style={{ color: "#3699FF" }}>{text}</a>,
    },
    {
      title: t('admin.super'),
      dataIndex: "superuser",
      // eslint-disable-next-line react/display-name
      render: (text) => (
        <a style={{ color: "#3699FF" }}>{text ? t('message.no') : t('message.no')}</a>
      ),
    },
    {
      title: t('admin.staff'),
      dataIndex: "staff",
      // eslint-disable-next-line react/display-name
      render: (text) => (
        <a style={{ color: "#3699FF" }}>{text ? t('message.no') : t('message.no')}</a>
      ),
    },
    {
      title: t('admin.action'),
      dataIndex: "action",
      // eslint-disable-next-line react/display-name
      render: function (id, record) {
        return (
          <>
            <Space size="middle" style={{ color: "#3699FF" }}>
              <Popconfirm
                title= {t('admin.remove')}
                onConfirm={() => {
                  deletUser(record.key);
                }}
              >
                <a>{t('admin.remove-user')}</a>
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
        setcurentData(res.data.count);
        if (res.status === 200) {
          return res.data.results;
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
            itsme = t('admin.you');
          }
          arr.push({
            id: val.id,
            firstname: val.first_name,
            lastname: val.last_name,
            username: val.username + itsme,
            // active: val.is_active,
            email: val.email,
            superuser: val.is_superuser,
            staff: val.is_staff,
          });
        });
        setdata1(arr);
      })
      .catch((err) => {
        console.log(err.message);
        setredirect(false);
      });
  }, [chnage]);

  const submitHandler = (e) => {
    e.preventDefault();
    const senddata = {
      email: formdata.email,
      username: formdata.firstname,
      first_name: formdata.firstname,
      last_name: formdata.lastname,
      is_superuser: formdata.superuser,
      is_staff: formdata.staff,
      password: formdata.pass,
    };
    console.log(senddata);
    axios
      .post("https://api.ticket.tempserver.ir/api/users/", senddata, {
        "content-type": "application/json",
        AUTHORIZATION: "Bearer " + token,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.data;
        }
      })
      .then((result) => {
        alert(JSON.stringify(result));
        setformdata({
          email: "",
          firstname: "",
          lastname: "",
          pass: "",
          confimpass: "",
          superuser: false,
          staff: true,
        });
        setchange((prev) => !prev);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const changePage = (curent) => {
    let ofset = (curent - 1) * 10;
    seturl(
      "https://api.ticket.tempserver.ir/api/users/?limit=10&offset=" + ofset
    );
    setchange((prev) => !prev);
  };
  let redirectelem = ""; //!
  if (redirect === false) {
    redirectelem = <Redirect to="/" />;
  }
  return (
    <>
      {redirectelem}
      <Helmet>
        <title>{t('title.admin')}</title>
      </Helmet>
      <Layout className="layout">
        <Header>
          <Head
            changeTicket={() => {
              setchange((prev) => !prev);
            }}
          />
        </Header>

        <Content style={{ padding: "0 100px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Row wrap={false} className="display">
              <Col flex="none">
                <div>
                  <Button
                    type="primary"
                    onClick={() => setmodalOpen(true)}
                    size={20}
                  >
                    {t('admin.new')}
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
            <div className="titleChart">{t('admin.chart')}</div>
            <Bar data={data} options={options} />
          </div>
        </div>
        <Modal
          title={[<h2 key="1">{t('admin.new')}</h2>]}
          centered
          visible={modalOpen}
          onCancel={() => setmodalOpen(false)}
          footer={[
            <Button
              key="back"
              onClick={() => setmodalOpen(false)}
              className="btn-cancel btn-modal"
            >
              {t('admin.cancel')}
            </Button>,
            <Button
              key="submit"
              onClick={(e) => submitHandler(e)}
              className="btn-modal"
            >
              {t('admin.add')}
            </Button>,
          ]}
        >
          <Form>
          <Form.Item
             name="email"
             rules={[
              {
                required: true,
                message: t('message.mail'),
              },
              {
                type: 'email',
                message: t('message.invalid'),
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
              placeholder= {t('register.email')}
              className="ant-icon"
              prefix={<MailOutlined />}
            />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: t('message.first'),
                },
                {
                  min: 2,
                  max: 15,
                  message: t('message.name-limit')
                }
              ]}>
            <Input
              size="large"
              value={formdata.name}
              onChange={(e) => {
                setformdata((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              placeholder= {t('register.first')}
              className="ant-icon"
              prefix={<UserOutlined />}
            />
              </Form.Item>
            <Form.Item
             name="LastName"
             rules={[
               {
                 required: true,
                 message: t('message.last'),
               },
               {
                min: 2,
                max: 20,
                message: t('message.last-limit')
              }
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
              placeholder= {t('register.last')}
              className="ant-icon"
              prefix={<UserOutlined />}
            />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t('message.pass'),
                },
                {
                  min: 8,
                  message: t('message.password-limit')
                }
              ]}
            >
            <Input
              value={formdata.pass}
              onChange={(e) => {
                setformdata((prev) => {
                  return { ...prev, pass: e.target.value };
                });
              }}
              size="large"
              placeholder= {t('register.pass')}
              className="ant-icon"
              prefix={<LockOutlined />}
            />
            </Form.Item>
            <Form.Item
               name="confirm_password"
               rules={[
                 {
                   required: true,
                   message: t('message.conf-pass'),
                 },
                 {
                   min: 8,
                   message: t('message.confirm-password-limit')
                 }
               ]}
              >
            <Input
              value={formdata.confimpass}
              onChange={(e) => {
                setformdata((prev) => {
                  return { ...prev, confimpass: e.target.value };
                });
              }}
              size="large"
              placeholder= {t('register.conf-pass')}
              className="ant-icon"
              prefix={<LockOutlined />}
            />
            </Form.Item>
            <div className="b-border">
              <span className="m-r">{t('admin.super')}</span>
              <Radio.Group
                onChange={(e) => {
                  setformdata((prev) => {
                    return { ...prev, superuser: e.target.value };
                  });
                }}
                value={formdata.superuser}
              >
                <Radio value={true}>yes</Radio>
                <Radio value={false}>no</Radio>
              </Radio.Group>
            </div>
            <br/>
            <div className="b-border">
              <span className="m-r">{t('register.staff')}</span>
              <Radio.Group
                onChange={(e) => {
                  setformdata((prev) => {
                    return { ...prev, staff: e.target.value };
                  });
                }}
                value={formdata.staff}
              >
                <Radio value={true}>{t('register.yes')}</Radio>
                <Radio value={false}>{t('register.no')}</Radio>
              </Radio.Group>
            </div>
            {/* <div>
              <span className="m-r">active</span>
              <Radio.Group
                onChange={(e) => {
                  setformdata((prev) => {
                    return { ...prev, active: e.target.value };
                  });
                }}
                value={formdata.active}
              >
                <Radio value={true}>yes</Radio>
                <Radio value={false}>no</Radio>
              </Radio.Group>
            </div> */}
            </Form>
        </Modal>
      </Layout>
    </>
  );
}

export default Admin;
