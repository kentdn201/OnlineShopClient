import React, { useContext, useState } from "react";
import { CartContext } from "../../../Share/Contexts/Context";
import { Link } from "react-router-dom";
import { Button, Space, Table } from "antd";

const Cart = () => {
  const [loading] = useState(false);
  const GlobalState = useContext(CartContext);
  const state = GlobalState.state;
  const dispatch = GlobalState.dispatch;

  const total = state.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'VND',
  });

  window.localStorage.setItem("cart", JSON.stringify(state))

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imageurl",
      key: "imageurl",
      render: (_, data) => {
        return (
          <img style={{ maxWidth: 100 }} alt={data.name} src={data.imageurl} />
        );
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, data) => {
        return <Link to={`/product/${data.slug}`}>{data.name}</Link>;
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
            <Button
              onClick={() => dispatch({ type: "INCREASE", payload: data })}
            >
              +
            </Button>
            <h3>{data.quantity}</h3>
            <Button
              onClick={() => {
                if (data.quantity > 1) {
                  dispatch({ type: "DECREASE", payload: data });
                } else {
                  dispatch({ type: "REMOVE", payload: data });
                }
              }}
            >
              -
            </Button>
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
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <Link onClick={() => dispatch({ type: "REMOVE", payload: data })}>
            Xóa
          </Link>
        </Space>
      ),
    },
  ];

  const data = state.map((product, index) => ({
    id: product.id,
    name: product.name,
    key: `product ${index}`,
    imageurl: product.imageURL,
    price: product.price,
    quantity: product.quantity,
    slug: product.slug,
  }));

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          padding: 10,
        }}
      >
        Giỏ Hàng
      </h2>
      {state.length > 0 ? (
        <>
          <Table
            columns={columns}
            loading={loading}
            dataSource={data}
            pagination={false}
          />
          {state.length > 0 && (
            <div>
              <h2 style={{ float: "right", paddingRight: 5 }}>
                Total: {formatter.format(total)} VNĐ
              </h2>
            </div>
          )}
        </>
      ) : (
        <>
          <h2
            style={{
              textAlign: "center",
              paddingTop: 80,
            }}
          >
            Hiện Tại Không có sản phẩm nào trong giỏ hàng
          </h2>
        </>
      )}
    </div>
  );
};

export default Cart;
