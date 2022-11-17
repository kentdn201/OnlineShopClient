import React, { useContext, useEffect } from "react";
import { Button, Form, Layout, Breadcrumb } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { useState } from "react";
import CategoryName from "../../../Components/CategoryName/CategoryName";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

const ViewProduct = () => {
  const navigate = useNavigate();
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  const [product, setProduct] = useState({});
  const [categoryId, setCategoryId] = useState(1);

  const slug = useParams().slug;

  useEffect(() => {
    axios.get(`http://localhost:8080/product/${slug}`).then((response) => {
      setProduct(response.data);
      document.title = `${response.data.name}`;
      setCategoryId(response.data.categoryId)
    });
  }, [slug]);

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Admin");
  }

  const onFinish = () => {
    navigate(`/admin/product/${slug}/edit`);
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
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Form {...layout} name="basic" onFinish={onFinish}>
          <Form.Item name="name" label="Tên Sản Phẩm">
            {product.name}
          </Form.Item>
          <Form.Item name="imageURL" label="Đường dẫn hình ảnh">
            <img src={product.imageURL} width={200} style={{ margin: 10 }} />
          </Form.Item>
          <Form.Item name="slug" label="Slug">
            {product.slug}
          </Form.Item>

          <Form.Item name="price" label="Giá">
            {product.price}
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            {product.description}
          </Form.Item>

          <Form.Item name="categoryId" label="Danh Mục">
            <CategoryName categoryId={categoryId}/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sửa sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default ViewProduct;
