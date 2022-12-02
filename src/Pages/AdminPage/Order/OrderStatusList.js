import {
  Space,
  Table,
  Layout,
  Breadcrumb,
  Form,
  Button,
  Modal,
  Input,
  notification,
} from "antd";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import OrderApiURL from "../../../Share/ApiURL/OrderApiURL";
import moment from "moment";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import OrderStatusApiURL from "../../../Share/ApiURL/OrderStatusApiURL";

const dateFormat = (date) => {
  var options = { hour: "numeric", minute: "numeric", second: "numeric" };
  let dFormat = new Date(date);
  return dFormat.toLocaleDateString("en-US", options);
};

const OrderStatusList = () => {
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { setCurrentHeader } = useContext(CurrentHeaderContext);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${OrderStatusApiURL.allOrderStatus}`).then((response) => {
      setIsLoading(false);
      setOrderStatusList(response.data);
      console.log(response.data);
      document.title = `Admin / Danh Sách Trạng Thái Đơn Hàng`;
    });
  }, []);

  const columns = [
    {
      title: "Trạng Thái",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name) => <div>{name}</div>,
    },
    {
      title: "",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <Link to={`/admin/don-hang/${data.id}/`}>Đổi tên trạng thái</Link>
        </Space>
      ),
    },
  ];

  const data = orderStatusList.map((orderStatus, index) => ({
    id: orderStatus.id,
    name: orderStatus.name,
    key: `order ${index}`,
  }));

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Admin");
  }

  const openNotification = (type) => {
    if (type === "success") {
      notification[type]({
        message: "Add Successfully",
      });
    } else if (type === "fail") {
      notification[type]({
        message: "Add Fail",
      });
    }
  };

  const onFinish = (values) => {
    axios
      .post(`${OrderStatusApiURL.addOrderStatus}`, values)
      .then((res) => {
        openNotification("success")
      })
      .catch((err) => {
        openNotification("fail")
      });
  };

  return (
    <div>
      {data.length > 0 ? (
        <>
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
                <Breadcrumb.Item>Danh Sách Trạng Thái Đơn Hàng</Breadcrumb.Item>
              </Breadcrumb>
              <Button
                type="primary"
                onClick={showModal}
                style={{
                  marginBottom: 10,
                }}
              >
                Thêm Trạng Thái
              </Button>
              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
              >
                <Form onFinish={onFinish}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input order status!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter order status" />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <div
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Ok
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </Modal>
              <Table columns={columns} loading={isLoading} dataSource={data} />
            </Content>
          </Layout>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderStatusList;
