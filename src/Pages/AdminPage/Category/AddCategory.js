import React, { useContext } from "react";
import {
  Button,
  Form,
  Input,
  Layout,
  Breadcrumb,
  Select,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { useState } from "react";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

const AddCategory = () => {
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const addCategoryURL = "http://localhost:8080/category/create";

  document.title = `Admin / Thêm Một Danh Mục`;

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Add Fail",
      description: "Please fill information of new user again",
    });
  };

  const openNotificationWithIconSuccess = (type) => {
    notification[type]({
      message: "Add Successfully",
    });
  };

  const rules = (name, min, max) => [
    {
      validator: (_, value) => {
        const lengthMin = min;
        const lengthMax = max;
        if (value <= 0) {
          return Promise.reject(new Error(`Vui lòng nhập lại ${name}`));
        } else if (value.length < lengthMin || value.length > lengthMax) {
          return Promise.reject(
            new Error(`${name} ít nhất ${min} - ${max} kí tự`)
          );
        }
        return Promise.resolve();
      },
    },
  ];

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Admin");
  }
  const onFinish = (values) => {
    // Thêm sản phẩm
    axios
      .post(addCategoryURL, values)
      .then((response) => {
        openNotificationWithIconSuccess("success");
        navigate("/admin/category/");
      })
      .catch((err) => {
        setError(err.response.data);
        openNotificationWithIcon("error");
        console.log(err.response.data.message);
      });
  };
  return (
    <Layout>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0px",
          }}
        >
          <Breadcrumb.Item>
            <Link to={"/"}>Trang Chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Thêm Danh Mục</Breadcrumb.Item>
        </Breadcrumb>
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên Danh Mục"
            rules={rules("Tên Sản Phẩm", 5, 100)}
          >
            <Input placeholder="Nhập Tên Danh Mục" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Đường dẫn hình ảnh"
            rules={rules("Đường dẫn hình ảnh", 5, 50000)}
          >
            <Input placeholder="Nhập Đường Dẫn Hình Ảnh" />
          </Form.Item>
          <Form.Item name="slug" label="Slug" rules={rules("Slug", 3, 100)}>
            <Input placeholder="Nhập Slug (Đường Dẫn Đến Danh Mục Trên URL) Của Danh Mục" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 6,
            }}
          >
            <div>
              {error.message === "Slug của danh mục đã tồn tại" ? (
                <p style={{ color: "#CF2338" }}>
                  Slug này đã tồn tại trong hệ thống
                </p>
              ) : (
                <></>
              )}
            </div>
            <Button type="primary" htmlType="submit">
              Thêm Mới
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default AddCategory;
