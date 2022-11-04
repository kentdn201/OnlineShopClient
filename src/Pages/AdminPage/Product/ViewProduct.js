import React, { useContext, useEffect } from "react";
import { Button, Form, Input, Layout, Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import TextArea from "antd/lib/input/TextArea";
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

const ViewProduct = () => {
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  const [field, setField] = useState({});

  const slug = useParams().slug;

  useEffect(() => {
    axios.get(`http://localhost:8080/product/${slug}`).then((response) => {
      setField(response.data);
      document.title = `${response.data.name}`;

    });
  }, [slug]);

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Admin");
  }

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
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
        <Form {...layout} name="basic" >
          <Form.Item name="name" label="Tên Sản Phẩm">
            <Input disabled />
          </Form.Item>
          <Form.Item name="imageURL" label="Đường dẫn hình ảnh">
            <Input disabled />
          </Form.Item>
          <Form.Item name="slug" label="Slug">
            <Input disabled />
          </Form.Item>

          <Form.Item name="price" label="Giá">
            <Input disabled />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <TextArea disabled />
          </Form.Item>

          <Form.Item name="categoryId" label="Danh Mục">
            <Input disabled />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 6,
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

export default ViewProduct;
