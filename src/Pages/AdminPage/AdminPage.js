import React, { useContext, useEffect, useState } from "react";
import { Layout, Table, Breadcrumb, Space } from "antd";
import CurrentHeaderContext from "../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const { setCurrentHeader } = useContext(CurrentHeaderContext);

  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/product/all").then((response) => {
      setListProduct(response.data);
      document.title = "Admin / Danh Sách Sản Phẩm";
    });
  }, []);
 
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imageurl",
      key: "imageurl",
      render: (_, data) => {
        return(<img style={{maxWidth:100}} alt={data.name} src={data.imageurl}/>)
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (_, data) => {
        return(<Link to={`/admin/product/${data.slug}`}>{data.name}</Link>)
      },
    },
    {
      title: "Danh Mục",
      dataIndex: "categoryId",
      key: "category",
      sorter: true,
    },
    
  {
    title: 'Action',
    key: 'action',
    render: (_) => (
      <Space size="middle">
        <Link to={"/admin"}>Xóa</Link>
      </Space>
    ),
  },
  ];

  const data = listProduct.map((product, index) => (
    {
      name: product.name,
      key: `product ${index}`,
      categoryId: product.categoryId,
      imageurl: product.imageURL,
      slug: product.slug
    }
  ))


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
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>
            <Link to={"/"}>Trang Chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Danh Sách Sản Phẩm</Breadcrumb.Item>
        </Breadcrumb>
        <Table style={{}} columns={columns} dataSource={data}  />
      </Content>
    </Layout>
  );
};

export default AdminPage;
