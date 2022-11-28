import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Title from "../../../Components/Title/Title";
import "../../../css/Login/Login.css";
import axios from "axios";
import ApiLogin from "../../../Share/ApiURL/ApiLogin";

const Login = ({ loading, ...props }) => {
  const userRef = useRef();

  const [cookies, setCookie] = useCookies(["user"]);
  const [error, setError] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    
    await axios
      .post(
        `${ApiLogin.loginApiUrl}`,
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setCookie("token", res.data.token, {
          maxAge: 7 * 24 * 60 * 60,
        });
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error.response);
        if (!error.response) {
          setError("No server response");
        } else if (error.response.status === 400) {
          setError("Missing Username or Password");
        } else if (error.response.status === 401) {
          setError("Unauthorized");
        } else {
          setError("Login failed");
        }
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
        name="username"
        rules={[
          {
            required: true,
            message: "Please enter username!",
          },
        ]}
        onChange={() => setError("")}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          ref={userRef}
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
          {error === "Tài khoản không có trong hệ thống" ? (
            <p style={{ color: "#CF2338" }}>
              Tài khoản bạn nhập không tồn tại vui lòng đăng nhập bằng tài khoản
              khác
            </p>
          ) : error === "Sai tài khoản hoặc mật khẩu" ? (
            <p style={{ color: "#CF2338" }}>
              Sai tài khoản hoặc mật khẩu vui lòng nhập lại
            </p>
          ) : error === "Unauthorized" ? (
            <p style={{ color: "#CF2338" }}>Unauthorized</p>
          ) : (
            <></>
          )}
        </div>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Đăng Nhập
        </Button>
        Hoặc <Link to={"/dang-ky"}>Đăng Ký Tài Khoản</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
