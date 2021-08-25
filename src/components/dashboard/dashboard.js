import Head from "../header/header";
import "./dashboard.css";
import {
  Layout,
  Breadcrumb,
  Table,
  Tag,
  Row,
  Col,
  Pagination,
  message,
  Input,
  Space,
  Popconfirm,
  Button,
} from "antd";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import OpenTicket from "../open ticket/open-ticket";
import { Helmet } from "react-helmet";
import debounce from "lodash/debounce";
import axios from "../../axios";

const { Header, Content } = Layout;
const { Search } = Input;

function Home() {
  const [data1, setdata1] = useState([]);
  const [chnage, setchange] = useState(true);
  const [seeOpenTicket, setseeOpenTicket] = useState(true);
  const [openTicket, setOpenTicket] = useState(false);
  const [openTicketTime, setOpenTicketTime] = useState(false);
  const [idTiketOpen, setidTiketOpen] = useState({ name: "", subject: "" });
  const [commentTicket, setcommentTicket] = useState();
  const [curentData, setcurentData] = useState();
  const [archive, setarchive] = useState(true);
  const [url, seturl] = useState("api/ticket");
  const deletTicket = (id) => {
    axios
      .put("api/ticket/" + id, {
        status: "Done",
      })
      .then((result) => {
        if (result.status === 202) {
          message.success("Ticket " + id + " was successfully deleted");
          setchange((prev) => !prev);
        }
      })
      .catch(() => message.error("This ticket is still NOT archived"));
  };
  const addArchive = (id) => {
    axios
      .put(`api/ticket/${id}`, {
        archived: true,
      })
      .then((res) => {
        if (res.status === 202) {
          message.success("ticket " + id + " was successfully archived");
        }
      })
      .catch(() => {
        message.error("Ticket is still NOT archived");
      });
  };

  const showArchive = () => {
    const urlArchive = archive ? "?archived=1" : "";
    seturl("api/ticket" + urlArchive);
    setchange((prev) => !prev);
    setarchive((prev) => !prev);
  };
  const history = useHistory();
  const openTicketfunc = (id) => {
    axios
      .get("/api/ticket/" + id)
      .then((res) => {
        if (res.status === 200 || res.status === 202) {
          return res.data;
        } else {
          message.error("No tickets have been archived");
        }
      })
      .then(([find]) => {
        history.push("/" + find.id);
        setidTiketOpen({
          key: find.id,
          description: "find.contents",
          priority: find.priority,
          task: find.type,
          status: [find.status],
          subject: find.subject,
          created: find.created_at,
          requester: "find.user.username",
          created2: +new Date(find.created_at),
          updated2: +new Date(find.updated_at),
        });
        setcommentTicket(find.contents);
        setOpenTicket(true);
        setOpenTicketTime(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      // eslint-disable-next-line react/display-name
      render: (status) => (
        <span>
          {status.map((tag) => {
            var color = "#0ead69";
            if (tag === "Done") {
              color = "#d00000";
            } else if (tag === "open") {
              color = "#fca311";
            } else if (tag === "Answered") {
              color = "#05299e";
            } else if (tag === "In Progress") {
              color = "#5c0099";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),

      filters: [
        {
          text: "New",
          value: "new",
        },
        {
          text: "In Progress",
          value: "In Progress",
        },
        {
          text: "Answered",
          value: "Answered",
        },
        {
          text: "Open",
          value: "open",
        },
        {
          text: "Done",
          value: "done",
        },
      ],
      onFilter: (value, record) => {
        return record.status.indexOf(value) === 0;
      },
    },
    {
      title: "#",
      dataIndex: "number",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      // eslint-disable-next-line react/display-name
      render: (priority) => {
        var color = "#0ead69";
        if (priority === "Critical") {
          color = "#ff6700"
        }
        else if (priority === "Normal") {
          color = "#3bceac"
        }
        else if(priority === "Urgent") {
          color = "#fad643"
        }
        return (
          <span>
            <Tag color={color} key={priority}>
              {priority.toUpperCase()}
            </Tag>
          </span>
        );
      },

      filters: [
        {
          text: "Critical",
          value: "Critical",
        },
        {
          text: "Urgent",
          value: "Urgent",
        },
        {
          text: "Normal",
          value: "Normal",
        },
      ],
      onFilter: (value, record) => {
        return record.priority.indexOf(value) === 0;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      // eslint-disable-next-line react/display-name
      render: (type) => {
        var color = "#0ead69";
        if (type === "Issue") {
          color = "#ee6055";
        } else if (type === "Task") {
          color = "#134074";
        }
        return (
          <span>
            <Tag color={color} key={type}>
              {type.toUpperCase()}
            </Tag>
          </span>
        );
      },

      filters: [
        {
          text: "Issue",
          value: "Issue",
        },
        {
          text: "Task",
          value: "Task",
        },
      ],
      onFilter: (value, record) => {
        return record.type.indexOf(value) === 0;
      },
    },
    {
      title: "Created",
      dataIndex: "created",
      sorter: (x, y) => x.created2 - y.created2,
    },

    {
      title: "Requester",
      dataIndex: "requester",
      // eslint-disable-next-line react/display-name
      render: (text) => (
        <a className="color-register" href={"./profile"}>
          {text}
        </a>
      ),
    },
    {
      title: "Updated",
      dataIndex: "updated",
      sorter: (a, b) => a.updated2 - b.updated2,
    },
    {
      title: "Action",
      dataIndex: "action",
      // eslint-disable-next-line react/display-name
      render: function (id, record) {
        return (
          <>
            <Space size="middle" style={{ color: "#3699FF" }}>
              <Popconfirm
                title="Do you want to Done this ticket?"
                onConfirm={() => {
                  deletTicket(record.key);
                }}
              >
                <a>Done {record.name}</a>
              </Popconfirm>
              <a
                onClick={() => {
                  openTicketfunc(record.key);
                }}
                className="color-orange"
              >
                Open
              </a>
              {archive ? (
                <a
                  onClick={() => {
                    addArchive(record.key);
                  }}
                  className="color-blue"
                >
                  add archive
                </a>
              ) : (
                ""
              )}
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
        if (res.status === 200) {
          return res.data;
        } else {
          message.error("operation failed");
        }
      })
      .then((result) => {
        setcurentData(result.total);
        return result.data;
      })
      .then((result) => {
        arr = [];
        const resul = [...result];
        resul.map((val) => {
          arr.push({
            key: val.id,
            priority:
              val.priority == "critical"
                ? "Critical"
                : val.priority == "normal"
                ? "Normal"
                : "Urgent",
            type: val.type == 0 ? "Issue" : "Task",
            status: [val.status],
            number: val.id,
            subject: val.subject,
            created: val.created_at.split(".")[0],
            requester: val.user_id,
            updated: val.updated_at.split(".")[0],
            created2: +new Date(val.created_at.split(".")[0]),
            updated2: +new Date(val.updated_at.split(".")[0]),
          });
        });
        return result;
      })
      .then(() => {
        setdata1(arr);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [chnage]);

  let openTicketElem = openTicketTime ? (
    <OpenTicket
      deletTicket={deletTicket}
      data={idTiketOpen}
      comments={commentTicket}
      open={openTicket}
      changeComment={() => {
        setchange((prev) => !prev);
        openTicketfunc(idTiketOpen.key);
      }}
      hidefunc={() => {
        setOpenTicket(false);
        setTimeout(() => {
          setOpenTicketTime(false);
        }, 1000);
      }}
    />
  ) : (
    ""
  );
  const location = useLocation().pathname.split("/")[1];
  if (seeOpenTicket) {
    if (location !== "" && location !== null && location !== undefined) {
      if (data1[0] !== undefined) {
        setseeOpenTicket(false);
        openTicketfunc(location);
      }
    }
  }

  const onSearch = debounce((value) => {
    if (value.target.value.trim() !== "") {
      seturl("api/ticket?subject=" + value.target.value);
      setchange((prev) => !prev);
    } else if (value.target.value.trim() === "") {
      seturl("api/ticket");
      setchange((prev) => !prev);
    }
  }, 500);

  const changePage = (curent) => {
    const urlArchive = archive ? "ticket/" : "ticketarchive/";
    seturl(`api/${urlArchive}?page=${curent}`);
    setchange((prev) => !prev);
  };
  const textArchive = archive ? "Archive" : "Ticket";
  return (
    <>
      <Helmet>
        <title>SAMA - Dashboard Page</title>
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
                  <Button type="dashed" onClick={() => showArchive()} primary>
                    {textArchive}
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="search-table">
                  <Search
                    onChange={(e) => onSearch(e)}
                    style={{ width: 200, height: 30, marginRight: "20px" }}
                  />
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
        {openTicketElem}
      </Layout>
    </>
  );
}

export default Home;
