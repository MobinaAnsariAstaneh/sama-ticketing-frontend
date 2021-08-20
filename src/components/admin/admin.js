import Head from '../header/header';
import './admin.css';
import {Radio,Modal,Input, Space ,Popconfirm,Pagination , Layout ,Breadcrumb,Table ,Row, Col, Button  } from 'antd';
import {useState,useEffect} from "react"
import {Helmet} from "react-helmet";
import axios from 'axios';
import { LockOutlined,MailOutlined,UserOutlined} from '@ant-design/icons';
const {  Header,Content } = Layout;
import { Bar } from 'react-chartjs-2';
import {Redirect} from "react-router-dom"
const data = {
  labels: ['comments', 'tickets', 'users'],
  datasets: [
    {
      label: 'done',
      data: [1, 6, 4],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'new',
      data: [9, 1, 8],
      backgroundColor: '#79EC7D',
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

function Admin(){
  const [data1,setdata1]=useState([])
  const [chnage,setchange]=useState(true)
  const [curentData,setcurentData] = useState()
  const [redirect,setredirect] = useState(false)
  const [modalOpen,setmodalOpen] = useState(false)
  const [formdata,setformdata]=useState({active:true,staff:false,name: "",teams:"", lastname: "", pass: "", confimpass: "", email: ""})
  const [url,seturl] = useState("https://api.ticket.tempserver.ir/api/users/")
  var token= localStorage.getItem("token")
  var username= localStorage.getItem("username")
  const deletUser = () =>{
    
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a.number - b.number,
    },
    {
        title: 'username',
        dataIndex: 'username',
      },
      {
        title: 'firstname',
        dataIndex: 'firstname',
      },
  
      {
        title: 'lastname',
        dataIndex: 'lastname',
      },
      {
        title: 'email',
        dataIndex: 'email',
        // eslint-disable-next-line react/display-name
        render: text => <a style={{color:"#3699FF"}}>{text}</a>,
      }
      ,{
        title: 'team',
        dataIndex: 'team',
      },
      // {
      //   title: 'superuser',
      //   dataIndex: 'superuser',
      //   // eslint-disable-next-line react/display-name
      //   render: text => <a style={{color:"#3699FF"}}>{text?"yes":"no"}</a>,
      // },
      {
        title: 'active',
        dataIndex: 'active',
         // eslint-disable-next-line react/display-name
         render: text => <a style={{color:"#3699FF"}}>{text?"yes":"no"}</a>,
      }
      ,{
        title: 'staff',
        dataIndex: 'staff',
           // eslint-disable-next-line react/display-name
           render: text => <a style={{color:"#3699FF"}}>{text?"yes":"no"}</a>,
      
      },
    {
        title: 'Action',
        dataIndex: 'action',
        // eslint-disable-next-line react/display-name
        render: function(id, record){
          return (
            <>
            <Space size="middle" style={{color:"#3699FF"}}>
            <Popconfirm
            title="Do you want to delete this ticket?"
            onConfirm={ ()=>{deletUser(record.key)}}
            >
              <a>remove user</a>
            </Popconfirm>
            </Space>
            </>
            
          )},
      },
  ];
  var arr=[]
  useEffect(()=>{
    axios.get(url,{
        headers:{
          'content-type': 'application/json',
          "AUTHORIZATION" : "Bearer "+token
        }
      }).then((res)=>{
        setcurentData(res.data.count)
        if(res.status===200){
            return res.data.results
          }else{
            setredirect(true)
          }
      })
      .then(result=>{
        arr=[]
        const resul=[...result]
        let itsme=""
        resul.map((val)=>{
          itsme=""
            if(val.username===username){
                itsme=" (you)"
            }
            arr.push({
              id:val.id,
              firstname:val.first_name,
              lastname:val.last_name,
              team:val.team,
              username:val.username+itsme,
              active:val.is_active,
              email:val.email,
              // superuser:val.is_superuser,
              staff:val.is_staff
            })
        })
        setdata1(arr)
      })
      .catch(err=>{
        console.log(err.message)
        setredirect(true)
      })
  },[chnage])

  const submitHandler=(e)=>{
    e.preventDefault()      
    const senddata ={
      email: formdata.email,
      username:formdata.name,
      first_name:formdata.name,
      last_name:formdata.lastname,
      // is_superuser:formdata.superuser,
      is_staff:formdata.staff,
      is_active:formdata.active,
      team:formdata.teams,
      password:formdata.pass
    }
    console.log(senddata)

    axios.post("https://api.ticket.tempserver.ir/api/users/",
    senddata,
    {
      'content-type': 'application/json',
      "AUTHORIZATION" : "Bearer "+token
    })
    .then((res)=>{
      if(res.status===200||res.status===201){
        return res.data
      }
    }).then((result)=>{
      alert(JSON.stringify(result))
      setformdata({email: "", name: "",active:true,staff:false,teams:"", lastname: "", pass: "", confimpass: ""})
      setchange(prev=>!prev)
    }).catch((err)=>{
      console.log(err.message)
    })
  }

  const changePage=(curent)=>{
    let ofset =(curent-1)*10
    seturl("https://api.ticket.tempserver.ir/api/users/?limit=10&offset="+ofset)
    setchange(prev=>!prev)
  }
  let redirectelem=""
  if(redirect===true){
    redirectelem=<Redirect to="/"/>
  }
  return (
    <>
    {redirectelem}
    <Helmet>
          <title>Ticketing - admin</title>
      </Helmet>
    <Layout className="layout">   

    <Header>
    <Head changeTicket={()=>{setchange(prev=>!prev)}}/>
    </Header>

    <Content style={{ padding: '0 100px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
      <Row wrap={false} className="display">
        <Col flex="none">
            <div>
                <Button type="primary" onClick={()=>setmodalOpen(true)} size={20}>
                    Add New User
                </Button>
            </div>
        </Col>
        <Col >
        <div className="search-table">
            <Pagination defaultCurrent={1} onChange={changePage} total={curentData} />  
        </div>
        </Col>
       </Row>
      </Breadcrumb>
      <div className="site-layout-content">    
          <Table  columns={columns} dataSource={data1} scroll={{ x: 'calc(650px + 50%)' }}/>
      </div>
    </Content>
    <div className="chart">
        <div className="chartContainer">
            <div className="titleChart">chart site</div>
            <Bar data={data} options={options} />
        </div>
    </div>
    <Modal
          title={[
              <h2 key="1">Add new user</h2>
           ]}
          centered
          visible={modalOpen}
          onCancel={()=>setmodalOpen(false)}
          footer={[
            <Button key="back" onClick={()=>setmodalOpen(false)} className="btn-cancel  btn-modal">
              Cancel
            </Button>,
            <Button key="submit"  onClick={(e)=>submitHandler(e)} className="btn-modal">
              Add user
            </Button>,
          ]}
        >
            <form>
                    <Input value={formdata.email} onChange={(e)=>{setformdata((prev)=>{
                      return {...prev,email:e.target.value}
                    })}} size="large" placeholder="Email" className="ant-icon" prefix={<MailOutlined />} />
                    <br />
                    <br />
                    <Input size="large" value={formdata.name} onChange={(e)=>{setformdata((prev)=>{
                      return {...prev,name:e.target.value}
                    })}} placeholder="Name" className="ant-icon" prefix={<UserOutlined />} />
                    <br />
                    <br />
                    <Input value={formdata.lastname} onChange={(e)=>{setformdata((prev)=>{
                      return {...prev,lastname:e.target.value}
                    })}} size="large" placeholder="Last Name" className="ant-icon" prefix={<UserOutlined />} />
                    <br />
                    <br />
                    <Input value={formdata.pass} onChange={(e)=>{setformdata((prev)=>{
                      return {...prev,pass:e.target.value}
                    })}} size="large" placeholder="Password" className="ant-icon" prefix={<LockOutlined />} />
                    <br />
                    <br />
                    <Input value={formdata.confimpass} onChange={(e)=>{
                      setformdata((prev)=>{
                      return {...prev,confimpass:e.target.value}
                    })}} size="large" placeholder="Confirm Password" className="ant-icon" prefix={<LockOutlined />} />
                    <br />
                    <br />
                    <Input value={formdata.teams} onChange={(e)=>{
                      setformdata((prev)=>{
                      return {...prev,teams:e.target.value}
                    })}} size="large" placeholder="teams" className="ant-icon" prefix={<UserOutlined />} />
                    <br/>
                    <br/>
                    {/* <div className="b-border">
                        <span className="m-r">superuser </span>
                        <Radio.Group onChange={(e)=>{
                      setformdata((prev)=>{
                      return {...prev,superuser:e.target.value}
                    })}} value={formdata.superuser} >
                        <Radio value={true}>yes</Radio>
                        <Radio value={false}>no</Radio>
                        </Radio.Group>
                    </div> */}
                    <div className="b-border">
                        <span className="m-r">staff</span>
                        <Radio.Group onChange={(e)=>{
                      setformdata((prev)=>{
                      return {...prev,staff:e.target.value}
                    })}} value={formdata.staff} >
                        <Radio value={true}>yes</Radio>
                        <Radio value={false}>no</Radio>
                        </Radio.Group>
                    </div>
                    <div >
                        <span className="m-r">active</span>
                        <Radio.Group onChange={(e)=>{
                      setformdata((prev)=>{
                      return {...prev,active:e.target.value}
                    })}} value={formdata.active} >
                        <Radio value={true}>yes</Radio>
                        <Radio value={false}>no</Radio>
                        </Radio.Group>
                    </div>
                   </form>
        </Modal>
    </Layout>
    </>
    );
}


export default Admin;