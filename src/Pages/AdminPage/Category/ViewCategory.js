import React, { useContext, useEffect } from "react";
import { Button, Form, Layout, Breadcrumb } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { useState } from "react";
import CategoryApiURL from "../../../Share/ApiURL/CategoryApiURL";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

const ViewCategory = () => {
  const navigate = useNavigate();
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  const [category, setCategory] = useState({});

  const slug = useParams().slug;

  useEffect(() => {
    axios.get(`${CategoryApiURL.categoryURL}/${slug}`).then((response) => {
      setCategory(response.data);
      document.title = `${response.data.name}`;
    });
  }, [slug]);

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Admin");
  }

  const onFinish = () => {
    navigate(`/admin/category/${slug}/edit`);
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
            <Link to={"/admin"}>Trang Chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>{category.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Form {...layout} name="basic" onFinish={onFinish}>
          <Form.Item name="name" label="Tên Sản Phẩm">
            {category.name}
          </Form.Item>
          <Form.Item name="image" label="Đường dẫn hình ảnh">
            <img src={category.image} alt={category.name} width={200} style={{ margin: 10 }} />
          </Form.Item>
          <Form.Item name="slug" label="Slug">
            {category.slug}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sửa danh mục
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default ViewCategory;
