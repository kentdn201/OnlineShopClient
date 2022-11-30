import { Space, Table, Layout, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import OrderApiURL from "../../../Share/ApiURL/OrderApiURL";
import moment from "moment";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";

const dateFormat = (date) => {
  var options = { hour: "numeric", minute: "numeric", second: "numeric" };
  let dFormat = new Date(date);
  return dFormat.toLocaleDateString("en-US", options);
};

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentHeader } = useContext(CurrentHeaderContext);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${OrderApiURL.allOrder}`).then((response) => {
      setIsLoading(false);
      setOrderList(response.data);
      document.title = `Admin / Danh Sách Đơn Hàng`;
    });
  }, []);

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
            <><div style={{ color: "orange" }}>Đang Giao Hàng</div></>
          ) : status === "Done" ? (
            <><div style={{ color: "green" }}> Đã Hoàn Thành Giao Hàng</div></>
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
          <Link to={`/admin/don-hang/${data.id}/`}>Xem chi tiết đơn hàng</Link>
        </Space>
      ),
    },
  ];

  const data = orderList.map((order, index) => ({
    id: order.id,
    userId: order.userId,
    createDate: order.createDate,
    orderStatus: order.orderStatus,
    key: `order ${index}`,
  }));

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Admin");
  }

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
                <Breadcrumb.Item>Danh Sách Sản Phẩm</Breadcrumb.Item>
              </Breadcrumb>
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

export default OrderList;
