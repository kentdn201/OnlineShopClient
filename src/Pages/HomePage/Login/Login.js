import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Title from "../../../Components/Title/Title";
import "../../../css/Login/Login.css";

const Login = () => {
  sessionStorage.setItem("key", 1);
  const [cookies, setCookie] = useCookies(["user"]);
  const [error, setError] = useState("");

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    axios
      .post(`http://localhost:8080/user/signin`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        setCookie("token", response.data, {
          maxAge: 7 * 24 * 60 * 60,
        });
        window.location.replace("/");
        sessionStorage.setItem("key", 1);
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
        onChange={() => setError("")}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
      <div>
          {error === "Tài khoản không có trong hệ thống" ? (
            <p style={{ color: "#CF2338" }}>
              Tài khoản bạn nhập không tồn tại vui lòng đăng nhập bằng tài khoản khác
            </p>
          ) : error === "Sai tài khoản hoặc mật khẩu" ? (
            <p style={{ color: "#CF2338" }}>
              Sai tài khoản hoặc mật khẩu vui lòng nhập lại
            </p>
          ) : (
            <></>
          )}
        </div>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to={"/"}>register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
