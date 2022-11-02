import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../../Components/Title/Title";
import "../../../css/Login/Login.css";

const Login = () => {
    sessionStorage.setItem("key", 1)
    let navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["user"])
    const [error, setError] = useState("");
    const [isFormValid, setFormValid] = useState(false);
    const [didCancel, setDidCancel] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const info = {
        Email: values.email,
        Password: values.password,
    }
    if(didCancel === true) return;
    setDidCancel(x => true);

    axios.post(`http://localhost:8080/user/signin`, {
        email: values.email, password: values.password
    }).then((response) => {
        if(values.remember === true)
        {
            setCookie('token', response.data, {
                maxAge: 7 * 24 * 60 * 60
            });
        } else {
            setCookie('token', response.data)
        }
        window.location.replace("/")
        sessionStorage.setItem("key", 1);
    })
  };

  const onFinishFailed = (errorInfo) => {
    setDidCancel(x => false);
    console.log('Failed:', errorInfo);
  }
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Title title={"Login"} />
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
        onChange={() => setError("")}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="Email"
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
        onChange={()=> setError("")}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to={"/"}>register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
