import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../Components/Title/Title";

const Signup = () => {
  const [error, setError] = useState("");

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    axios
      .post(`http://localhost:8080/user/signup`, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        window.location.replace("/login");
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
      <Title title={"Đăng Ký"} />
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập firstName",
          },
        ]}
        onChange={() => setError("")}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="First name"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          {
            required: true,
            message: "Vui lòng last name!",
          },
        ]}
        onChange={() => setError("")}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Last name"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập email!",
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
            message: "Vui lòng nhập mật khẩu!",
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
          {error === "Tài khoản đã tồn tại" ? (
            <p style={{ color: "#CF2338" }}>
              Tài khoản bạn đăng ký đã tồn tại trong hệ thống!!
            </p>
          ) : (
            <></>
          )}
        </div>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Đăng Ký
        </Button>
        Hoặc <Link to={"/login"}>Đã Có Tài Khoản</Link>
      </Form.Item>
    </Form>
  );
};

export default Signup;
