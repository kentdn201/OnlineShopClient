import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderApiURL from "../../../Share/ApiURL/OrderApiURL";
import { Table } from "antd";
import { useContext } from "react";
import CurrentUserContext from "../../../Share/Contexts/CurrentUserContext";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [order, setOrder] = useState({
    orderId: "",
    productId: "",
    quantity: 0,
    price: "",
    userId: "",
    orderStatus: "",
    orderProductDtos: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const orderId = useParams().orderid;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${OrderApiURL.orderDetailByUser}${orderId}/`)
      .then((response) => {
        setIsLoading(false);
        setOrder(response.data);
        if(currentUser.id !== response.data.userId)
        {
          navigate("/")
        }
      });
  }, []);

  let columns = [];
  let data = [];
  let total;
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "VND",
  });

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
          return <div><img width={100} src={`${data.productImage}`}/></div>;
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

  return (
    <div>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div
            style={{
              margin: "0 64px",
            }}
          >
            {order === undefined ? (
              <></>
            ) : currentUser.role === "User" && currentUser.id !== order.userId ? (
              <>
                {" "}
                <h2
                  style={{
                    textAlign: "center",
                    padding: 200,
                  }}
                >
                  Bạn không thể truy cập vào đơn hàng này
                </h2>
              </>
            ) : (
              <>
                <h2
                  style={{
                    textAlign: "center",
                    padding: 10,
                  }}
                >
                  Chi tiết đơn hàng
                </h2>
                <h3>Người Nhận: {currentUser.lastName + " " + currentUser.firstName}</h3>
                <h3>Số Điện Thoại: {order.phoneNumber}</h3>
                <h3>Địa Chỉ: {order.address}</h3>
                <h3>Ghi Chú: {order.note}</h3>
                <h3>Email: {currentUser.email}</h3>
                <h3>Kiểu Thanh Toán: {order.typePayment}</h3>
                <h3>
                      <div>
                        {order.orderStatus.name === "Chưa Lấy Hàng" ? (
                          <>
                            <div style={{ color: "red" }}>
                              Tình Trạng Đơn Hàng: Chưa Giao Hàng
                            </div>
                          </>
                        ) : order.orderStatus.name === "Đang Lấy Hàng" ? (
                          <>
                            <div style={{ color: "orange" }}>
                              Tình Trạng Đơn Hàng: Đang Lấy Hàng
                            </div>
                          </>
                        ) : order.orderStatus.name ===
                          "Đang Chuẩn Bị Giao Hàng" ? (
                          <>
                            <div style={{ color: "green" }}>
                              {" "}
                              Tình Trạng Đơn Hàng: Đang Chuẩn Bị Giao Hàng
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ color: "red" }}>
                              Tình Trạng Đơn Hàng: Đã Hủy
                            </div>
                          </>
                        )}
                      </div>
                    </h3>

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
        </>
      )}
    </div>
  );
};

export default OrderDetail;
