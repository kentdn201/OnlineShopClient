import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../../../Share/ApiURL/ApiURL";
import OrderApiURL from "../../../Share/ApiURL/OrderApiURL";
import { Table } from "antd";
import GetImageURL from "../GetOneProduct/GetImageURL";
import GetName from "../GetOneProduct/GetName";
import { useContext } from "react";
import CurrentUserContext from "../../../Share/Contexts/CurrentUserContext";

const OrderDetail = () => {
  const [user, setUser] = useState();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userId = useParams().userid;
  const orderId = useParams().orderid;

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${ApiURL.Api}/user/${userId}`).then((response) => {
      setIsLoading(false);
      setUser(response.data);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${OrderApiURL.orderDetailByUser}${orderId}/${userId}`)
      .then((response) => {
        setIsLoading(false);
        setOrder(response.data);
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
      productId: order.productId,
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
          return <GetImageURL productId={data.productId} />;
        },
      },
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
        render: (_, data) => {
          return <GetName productId={data.productId} />;
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
