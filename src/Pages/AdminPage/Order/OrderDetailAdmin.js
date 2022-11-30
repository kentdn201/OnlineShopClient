import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ApiURL from "../../../Share/ApiURL/ApiURL";
import OrderApiURL from "../../../Share/ApiURL/OrderApiURL";
import {
  Table,
  Layout,
  Breadcrumb,
  Button,
  Modal,
  Form,
  Select,
  notification,
} from "antd";
import GetImageURL from "../../HomePage/GetOneProduct/GetImageURL";
import GetName from "../../HomePage/GetOneProduct/GetName";
import { Content } from "antd/lib/layout/layout";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { useContext } from "react";
import UserApiURL from "../../../Share/ApiURL/UserApiURL";

const OrderDetailAdmin = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [order, setOrder] = useState({
    orderId: "",
    productId: "",
    quantity: 0,
    price: "",
    userId: "",
    orderProductDtos: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const orderId = useParams().orderid;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${OrderApiURL.orderDetailByUser}${orderId}/`)
      .then((response) => {
        setIsLoading(false);
        setOrder(response.data);
        axios
          .get(`${UserApiURL.getUserApi}/${response.data.userId}`)
          .then((res) => {
            setUser(res.data)
          });
        document.title = `Admin / Đơn Hàng Chi Tiết`;
      });
  }, []);

  let columns = [];
  let data = [];
  let total;

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "VND",
  });

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Admin");
  }

  if (order === undefined) {
  } else {
    data = order.orderProductDtos.map((order, index) => ({
      orderId: order.orderId,
      key: `order ${index}`,
      productImage: order.product.imageURL,
      productName: order.product.name,
      quantity: order.quantity,
      price: order.price,
      userId: order.userId,
    }));

    total = order.orderProductDtos.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    columns = [
      {
        title: "Ảnh",
        dataIndex: "imageURL",
        key: "imageurl",
        render: (_, data) => {
          return (
            <div>
              <img width={100} src={`${data.productImage}`} />
            </div>
          );
        },
      },
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
        render: (_, data) => {
          return <div>{data.productName}</div>;
        },
      },
      {
        title: "Số Lượng",
        dataIndex: "quantity",
        key: "quantity",
        sorter: (a, b) => a.quantiy - b.quantiy,
        render: (_, data) => {
          return (
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h3>{data.quantity}</h3>
            </div>
          );
        },
      },
      {
        title: "Tổng giá",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => a.price - b.price,
        render: (_, data) => {
          return formatter.format(data.price * data.quantity);
        },
      },
    ];
  }

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Cập nhật trang thái thất bại",
    });
  };

  const openNotificationWithIconSuccess = (type) => {
    notification[type]({
      message: "Cập nhật trạng thái thành công",
    });
  };

  const onFinish = (values) => {
    console.log(values);
    axios
      .put(`${OrderApiURL.orderEditStatus}/${order.id}/${order.userId}`, values)
      .then((response) => {
        openNotificationWithIconSuccess("success");
        navigate("/admin/don-hang");
      })
      .catch((err) => {
        setError(err.response.data);
        openNotificationWithIcon("error");
      });
  };

  return (
    <div>
      {isLoading ? (
        <></>
      ) : (
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
                  <Link to={"/"}>Trang Chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Chi Tiết Đơn Hàng</Breadcrumb.Item>
              </Breadcrumb>
              <div
                style={{
                  margin: "0 64px",
                }}
              >
                {order === undefined ? (
                  <></>
                ) : (
                  <>
                    <h3>Người Nhận: {user.lastName + " " + user.firstName}</h3>
                    <h3>Số Điện Thoại: {order.phoneNumber}</h3>
                    <h3>Địa Chỉ: {order.address}</h3>
                    <h3>Ghi Chú: {order.note}</h3>
                    <h3>Email: {user.email}</h3>
                    <h3>Kiểu Thanh Toán: {order.typePayment}</h3>
                    <h3>
                      {order.orderStatus === "NotDelivery" ? (
                        <>
                          <p style={{ color: "red" }}>
                            Tình Trạng Đơn Hàng: Chưa Giao Hàng
                          </p>
                        </>
                      ) : order.orderStatus === "Delivery" ? (
                        <>
                          <p style={{ color: "orange" }}>
                            Tình Trạng Đơn Hàng: Đang Giao Hàng
                          </p>
                        </>
                      ) : order.orderStatus === "Done" ? (
                        <>
                          <p style={{ color: "green" }}>
                            Tình Trạng Đơn Hàng: Đã Hoàn Thành Giao Hàng
                          </p>
                        </>
                      ) : (
                        <>
                          <p style={{ color: "red" }}>
                            Tình Trạng Đơn Hàng: Đã Hủy
                          </p>
                        </>
                      )}
                    </h3>
                    <Button
                      style={{
                        marginBottom: 15,
                      }}
                      type="primary"
                      onClick={showModal}
                    >
                      Cập nhật đơn hàng
                    </Button>
                    <Modal
                      title="Basic Modal"
                      open={isModalOpen}
                      onCancel={handleCancel}
                      footer={null}
                    >
                      <Form onFinish={onFinish}>
                        <Form.Item
                          name="orderStatus"
                          label="Cập nhật trạng thái"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Chọn Danh Mục"
                            defaultValue={
                              order.orderStatus === "NotDelivery"
                                ? "Chưa Giao Hàng"
                                : order.orderStatus === "Delivery"
                                ? "Đang Giao Hàng"
                                : order.orderStatus === "Done"
                                ? "Đã Hoàn Thành"
                                : order.orderStatus === "Cancel"
                                ? "Hủy"
                                : ""
                            }
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={[
                              {
                                value: 0,
                                label: "Chưa Giao Hàng",
                              },
                              {
                                value: 1,
                                label: "Đang Giao Hàng",
                              },
                              {
                                value: 2,
                                label: "Đã Hoàn Thành",
                              },
                              {
                                value: 3,
                                label: "Hủy",
                              },
                            ]}
                          />
                        </Form.Item>
                        <div
                          style={{
                            textAlign: "right",
                          }}
                        >
                          <Button type="primary" htmlType="submit">
                            Ok
                          </Button>
                        </div>
                      </Form>
                    </Modal>

                    <Table
                      columns={columns}
                      loading={isLoading}
                      dataSource={data}
                      pagination={false}
                    />
                    {order.orderProductDtos.length > 0 && (
                      <div>
                        <h2 style={{ float: "right", paddingRight: 5 }}>
                          Total: {formatter.format(total)} VNĐ
                        </h2>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Content>
          </Layout>
        </>
      )}
    </div>
  );
};

export default OrderDetailAdmin;
