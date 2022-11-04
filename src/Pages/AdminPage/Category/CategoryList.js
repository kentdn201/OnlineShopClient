import React, { useContext, useEffect, useState } from "react";
import { Layout, Table, Breadcrumb, Space } from "antd";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryList = () => {
  const { setCurrentHeader } = useContext(CurrentHeaderContext);

  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/category/all").then((response) => {
        setListCategory(response.data);
      document.title = "Admin / Danh Sách Các Danh Mục";
    });
  }, []);
 
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, data) => {
        return(<img style={{maxWidth:100}} alt={data.name} src={data.image}/>)
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, data) => {
        return(<Link to={`/admin/category/${data.slug}`}>{data.name}</Link>)
      },
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

  const data = listCategory.map((category, index) => (
    {
      name: category.name,
      key: `product ${index}`,
      image: category.image,
      slug: category.slug
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
          <Breadcrumb.Item>Danh Sách Các Danh Mục</Breadcrumb.Item>
        </Breadcrumb>
        <Table columns={columns} dataSource={data}  />
      </Content>
    </Layout>
  );
};

export default CategoryList;
