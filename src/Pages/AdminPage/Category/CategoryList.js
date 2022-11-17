import React, { useContext, useEffect, useState } from "react";
import {
  Layout,
  Table,
  Breadcrumb,
  Space,
  Button,
  Modal,
  notification
} from "antd";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryApiURL from "../../../Share/ApiURL/CategoryApiURL";

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
        return (
          <img style={{ maxWidth: 100 }} alt={data.name} src={data.image} />
        );
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, data) => {
        return <Link to={`/admin/category/${data.slug}`}>{data.name}</Link>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={(e) => {
              Modal.confirm({
                className: "FormNotification btn-left has-header centered",
                centered: true,
                title: "Bạn Có Chắc?",
                content: "Bạn Có Muốn Xóa Danh Mục Này Không",
                okText: "Có",
                icon: null,
                cancelText: "Không",
                okButtonProps: {
                  type: "primary",

                  danger: true,
                  style: {
                    marginRight: "15px",
                    float: "left",
                    borderRadius: "5px",
                    marginLeft: "auto",
                    backgroundColor: "#CF2338",
                    color: "white",
                  },
                },
                cancelButtonProps: {
                  style: {
                    borderRadius: "5px",
                    marginRight: "5px",
                  },
                },

                onOk: () => {
                  axios
                    .delete(`${CategoryApiURL.categoryURLDelte}/${data.id}`, {
                      id: data.id,
                    })
                    .then((response) => {
                      notification["success"]({
                        message: `${response.data.message}`,
                      });
                      
                      var id = data.id
                      if(response.data.message === `Xóa Thành Công Danh Mục: ${data.name}`)
                      {
                        const itemToRemove = listCategory.filter((item) => {
                          return item.id !== id;
                        });
                        setListCategory(itemToRemove)
                      }
                    })
                    .catch((err) => {
                      notification["error"]({
                        message: `${err.response.data.message}`,
                      });
                    });
                },
              });
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data = listCategory.map((category, index) => ({
    id: category.id,
    name: category.name,
    key: `product ${index}`,
    image: category.image,
    slug: category.slug,
  }));

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
            <Link to={"/admin"}>Trang Chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Danh Sách Các Danh Mục</Breadcrumb.Item>
        </Breadcrumb>
        <Table columns={columns} dataSource={data} />
      </Content>
    </Layout>
  );
};

export default CategoryList;
