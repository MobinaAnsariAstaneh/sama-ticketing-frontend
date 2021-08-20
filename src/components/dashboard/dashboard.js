import Head from "../header/header";
import "./dashboard.css";
import { Layout, Breadcrumb } from "antd";
import { Table, Tag } from "antd";
import { Row, Col } from "antd";
import { Pagination, message } from "antd";
import { Input, Space, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import OpenTicket from "../open ticket/open-ticket";
import { Helmet } from "react-helmet";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import { Button } from "antd";

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
  const [url, seturl] = useState(
    "https://api.ticket.tempserver.ir/api/ticket/"
  );
  var token = localStorage.getItem("token");
  const deletTicket = (id) => {
    axios
      .get("https://api.ticket.tempserver.ir/api/close/" + id + "/", {
        headers: {
          "content-type": "application/json",
          AUTHORIZATION: "Bearer " + token,
        },
      })
      .then((res) => res.data)
      .then((result) => {
        if (result.message === "OK") {
          message.success("Ticket " + id + " deleted");
          setchange((prev) => !prev);
        } else {
          console.log(result);
          message.error("somthing wrong");
        }
      })
      .catch((err) => console.log(err.message));
  };
  const addArchive = (id) => {
    axios
      .get(`https://api.ticket.tempserver.ir/api/archive/${id}/`, {
        headers: {
          "content-type": "application/json",
          AUTHORIZATION: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          message.error("try agin");
        }
      })
      .then((result) => {
        message.success(result.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const showArchive = () => {
    const urlArchive = archive ? "ticketarchive/" : "ticket/";
    seturl("https://api.ticket.tempserver.ir/api/" + urlArchive);
    setchange((prev) => !prev);
    setarchive((prev) => !prev);
  };
  const history = useHistory();
  const openTicketfunc = (id) => {
    axios
      .get(
        "https://api.ticket.tempserver.ir/api/ticket/?limit=10000&offset=0",
        {
          headers: {
            "content-type": "application/json",
            AUTHORIZATION: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          message.error("try agin");
        }
      })
      .then((result) => {
        return result.results;
      })
      .then((result) => {
        const resul = [...result];
        const find = resul.find((val) => Number(id) === val.id);
        return find;
      })
      .then((find) => {
        history.push("/" + id);
        console.log(find);
        setidTiketOpen({
          key: find.id,
          description: find.description,
          priority: find.priority,
          task: find.task,
          team: find.team,
          status: [find.tag],
          subject: find.subject,
          created: find.created_at,
          created2: +new Date(find.created_at),
          requester: find.user.username,
        });
        setcommentTicket(find.comments);
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
            var color = "green";
            if (tag === "done") {
              color = "red";
            } else if (tag === "open") {
              color = "yellow";
            } else if (tag === "answered") {
              color = "blue";
            } else if (tag === "inprogres") {
              color = "purple";
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
          value: "inprogres",
        },
        {
          text: "Answered",
          value: "answered",
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
      render: (tag) => {
        var color = "green";
        if (tag === "urgent") {
          color = "blue";
        } else if (tag === "critical") {
          color = "red";
        }
        return (
          <span>
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          </span>
        );
      },

      filters: [
        {
          text: "Normal",
          value: "normal",
        },
        {
          text: "Urgent",
          value: "urgent",
        },
        {
          text: "Critical",
          value: "critical",
        },
      ],
      onFilter: (value, record) => {
        return record.status.indexOf(value) === 0;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      // eslint-disable-next-line react/display-name
      // render: (tag) => {
      //     var color = "green";
      //     if (tag === "task") {
      //       color = "blue";
      //     } else if (tag === "issue") {
      //       color = "red";
      //     }
      //   return(
      //   <span>
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //   </span>
      // )},

      filters: [
        {
          text: "Issue",
          value: "issue",
        },
        {
          text: "Task",
          value: "task",
        },
      ],
      onFilter: (value, record) => {
        return record.status.indexOf(value) === 0;
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
      title: "Customer",
      dataIndex: "customer",
    },
    {
      title: "Team",
      dataIndex: "team",
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
                title="Do you want to delete this ticket?"
                onConfirm={() => {
                  deletTicket(record.key);
                }}
              >
                <a>Delete {record.name}</a>
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
                  className="color-blue "
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
      .get(url, {
        headers: {
          "content-type": "application/json",
          AUTHORIZATION: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          message.error("try agin");
        }
      })
      .then((result) => {
        console.log(result);
        setcurentData(result.count);
        return result.results;
      })
      .then((result) => {
        arr = [];
        const resul = [...result];
        console.log(resul);

        resul.map((val) => {
          arr.push({
            key: val.id,
            priority: val.priority,
            task: val.task,
            status: [val.tag],
            number: val.id,
            subject: val.subject,
            created: val.created_at.split(".")[0],
            created2: +new Date(val.created_at.split(".")[0]),
            requester: val.user.username,
            team: val.team.title,
            customer: "Main",
            updated: val.updated_at.split(".")[0],
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
      axios
        .get(
          "https://api.ticket.tempserver.ir/api/ticket/?limit=10000&search=" +
            value.target.value,
          {
            headers: {
              "content-type": "application/json",
              AUTHORIZATION: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          } else {
            message.error("try agin");
          }
        })
        .then((result) => {
          return result.results;
        })
        .then((result) => {
          arr = [];
          const resul = [...result];
          resul.map((val) => {
            arr.push({
              key: val.id,
              status: [val.tag],
              priority: val.priority,
              task: val.task,
              number: arr.length + 1,
              subject: val.subject,
              created: val.created_at,
              created2: +new Date(val.created_at),
              requester: val.user.username,
              team: val.team.title,
              customer: "Main",
              updated: val.updated_at,
              updated2: +new Date(val.updated_at),
            });
          });
          return result;
        })
        .then(() => {
          setdata1(arr);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (value.target.value.trim() === "") {
      setchange((prev) => !prev);
    }
  }, 1000);

  const changePage = (curent) => {
    let ofset = (curent - 1) * 10;
    const urlArchive = archive ? "ticket/" : "ticketarchive/";
    seturl(
      `https://api.ticket.tempserver.ir/api/${urlArchive}?limit=10&offset=` +
        ofset
    );
    setchange((prev) => !prev);
  };
  const textArchive = archive ? "Archive" : "Ticket";
  return (
    <>
      <Helmet>
        <title>Ticketing - Dashboard</title>
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
