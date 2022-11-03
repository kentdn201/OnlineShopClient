import React, { useContext } from "react";
import { Button, Form, Input, Layout, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import { useEffect } from "react";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};
const AddProduct = () => {
  const { setCurrentHeader } = useContext(CurrentHeaderContext);

  const addProductURL = "http://localhost:8080/product/add";

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Admin");
  }
  const onFinish = (values) => {
    console.log(values);
    // Thêm mới sản phẩm ở đây
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
          <Breadcrumb.Item>Thêm Sản Phẩm</Breadcrumb.Item>
        </Breadcrumb>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="slug" label="Slug">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 10,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thêm Mới
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default AddProduct;
