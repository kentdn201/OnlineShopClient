import React, { useContext, useEffect, useState } from "react";
import { Layout, Table, Breadcrumb, Space, Button, Modal, notification } from "antd";
import CurrentHeaderContext from "../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryName from "../../Components/CategoryName/CategoryName";
import ProductApiURL from "../../Share/ApiURL/ProductApiURL";

const AdminPage = () => {
  const { setCurrentHeader } = useContext(CurrentHeaderContext);

  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get(`${ProductApiURL.productsURL}`).then((response) => {
      setListProduct(response.data);
      setLoading(false);
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
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, data) => {
        return(<Link to={`/admin/product/${data.slug}`}>{data.name}</Link>)
      },
    },
    {
      title: "Danh Mục",
      dataIndex: "categoryId",
      key: "category",
      sorter: (a, b) => a.categoryId - b.categoryId,
      render: (_, data) => {
        return(<CategoryName categoryId={data.categoryId}/>)
      }
    },
    
  {
    title: 'Action',
    key: 'action',
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
                    .delete(`${ProductApiURL.productDelete}/${data.slug}`, {
                      slug: data.slug,
                    })
                    .then((response) => {
                      notification["success"]({
                        message: `${response.data.message}`,
                      });
                      
                      var id = data.id
                      if(response.data.message === `Xóa Thành Công Sản Phẩm: ${data.name}`)
                      {
                        const itemToRemove = listProduct.filter((item) => {
                          return item.id !== id;
                        });
                        setListProduct(itemToRemove)
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

  const data = listProduct.map((product, index) => (
    {
      id: product.id,
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
        <Table columns={columns} loading={loading} dataSource={data}  />
      </Content>
    </Layout>
  );
};

export default AdminPage;
