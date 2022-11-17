import { Space, Table } from "antd";
import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import OrderApiURL from "../../../Share/ApiURL/OrderApiURL";
import moment from "moment";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";

const dateFormat = (date) => {
  var options = { hour: "numeric", minute: "numeric", second: "numeric" };
  let dFormat = new Date(date);
  return dFormat.toLocaleDateString("en-US", options);
};

const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentHeader } = useContext(CurrentHeaderContext);

  const id = useParams().id;

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${OrderApiURL.getAllOrderByUser}${id}`).then((response) => {
      setIsLoading(false);
      setOrderList(response.data);
    });
  }, [id]);

  const columns = [
    {
      title: "Ngày Đặt",
      dataIndex: "createDate",
      key: "createDate",
      sorter: (a, b) =>
        moment(a.createDate).unix() - moment(b.createDate).unix(),
      render: (date) => <Link>{dateFormat(date)}</Link>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      sorter: (a, b) => a.orderStatus.length - b.orderStatus.length,
      render: (status) => (
        <div>
          {status === "NotDelivery" ? (
            <>
              <div style={{ color: "red" }}>Chưa Giao Hàng</div>
            </>
          ) : status === "Delivery" ? (
            <>
              <div style={{ color: "orange" }}>Đang Giao Hàng</div>
            </>
          ) : status === "Done" ? (
            <>
              <div style={{ color: "green" }}> Đã Hoàn Thành Giao Hàng</div>
            </>
          ) : (
            <>
              <div style={{ color: "red" }}> Đã Hủy</div>
            </>
          )}
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <Link to={`/don-hang/${data.id}/${id}`}>Xem chi tiết đơn hàng</Link>
        </Space>
      ),
    },
  ];

  const data = orderList.map((order, index) => ({
    id: order.id,
    createDate: order.createDate,
    orderStatus: order.orderStatus,
    key: `order ${index}`,
  }));

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Order Detail");
  }

  return (
    <div>
      {data.length > 0 ? (
        <>
          <h2
            style={{
              textAlign: "center",
              padding: 10,
            }}
          >
            Đơn Hàng
          </h2>
          <div
            style={{
              margin: "0 64px",
            }}
          >
            <Table columns={columns} loading={isLoading} dataSource={data} />;
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Order;
