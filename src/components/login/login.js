import React, { useState,useEffect  } from "react";
import { Layout, message } from 'antd';
import { Row, Col } from 'antd';
import imgLogin from '../../assets/login.jpg';
import imagelogin from '../../assets/MS.svg';
import  { useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import {Helmet} from "react-helmet";
import axios from "axios"

const { Content } = Layout;
function Login ()  {
  const [red,setred] = useState(false)
  const [check,setcheck] = useState(false)
  const [form]=Form.useForm()
  const storage=localStorage.getItem("login")
  useEffect(() => {
    const storageObj=JSON.parse(storage)
    if(storage !==null){
      form.setFieldsValue({
        username:storageObj.username,
        password:storageObj.password,        
      })
    }    
  }, [])
  
  const handleFormSubmit = values => {
    const name = values.username,
    pass=values.password
    axios.post("https://api.ticket.tempserver.ir/api/token/",{
      username:name,
      password:pass
    })
    .then((res)=>{
      if(res.status===200){
        if(check===true){
          localStorage.setItem("login",JSON.stringify({
            username:name,
            password:pass
          }))
        }
        return res.data
      }else if(res.status === 401){
        message.error("username or password is invalid")
      }
    })
    .then((res)=>{   
      localStorage.setItem("auth","true")
      localStorage.setItem("token",res.access)
      return localStorage.setItem("username",name)
      
    }).then(()=>{
      setTimeout(()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("auth")
        localStorage.removeItem("username")
      },3600*3*1000)
      setred(true)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  };
  const history=useHistory()
  if(red){
    history.push("/")
  }
  const register = () => {
    message.success("Register page");
    history.push("/register");
  };
  const forgotpass = () => {
    message.success("Forgotten Password page");
    history.push("./forgot");
  };

    return (
      
 <>
      <Helmet>
          <title>SAMA - Login Page</title>
      </Helmet>
    
   <Layout >
    <Content className="login__layout">
    <Row>
        <Col className="item_center" span={12}>  
            <div><img src={imagelogin} className="imglogo "  alt="" /></div>
            <p className="p-size">Welcome Back</p>
      
            <Form 
              name="normal_login"
              className="login-form"
              form={form}
              initialValues={{
                remember: true,
              }}
              onFinish={handleFormSubmit}
            >
              
            <div className="flex-space">
            <Form.Item className="ant-input-size"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input prefix={<MailOutlined className="ant-icon site-form-item-icon " />} placeholder="Email" />
              </Form.Item>
              <Form.Item className="ant-input-size"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined className="ant-icon site-form-item-icon" />}
                  type="password"
                  placeholder="Password "
                />
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit" className="login-form-button ">
                  Login
                </Button>
              </Form.Item>
              <Form.Item >
              <div className="width-style"> 
                <Form.Item name="remember"  noStyle>
                <Checkbox onChange={(e)=>{setcheck(e.target.checked)}}>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot"  onClick={forgotpass}>
                  Forgot password
                </a> 
                    </div>
              </Form.Item>
              <Form.Item  className="botoom-border" >
                Don&apos;t have an account? <a className="a-style"onClick={register}>Register</a>
                <br />
                Having an issue? <a className="a-style" href={'./guide'}>Contact us</a>
              </Form.Item>
            </div>
    </Form>
              </Col>
        <Col className="login__right-image" span={12}>   
            <div>
              <img src={imgLogin} className="grayscale loginImag" width="100%" height="721vh" alt="" />
              <p className="para">
              <span>SAMA WEB</span>
              <div>A good platform for communication between employers and the programming team</div>
              </p>
            </div>
        </Col>
    </Row>
    </Content>
  </Layout>
 </>     
  );
}

export default Login;