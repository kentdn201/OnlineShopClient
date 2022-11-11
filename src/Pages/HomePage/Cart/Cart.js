import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Table, Form, Input, InputNumber, Row, Col } from "antd";
import CurrentUserContext from "../../../Share/Contexts/CurrentUserContext";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const Cart = () => {
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Cart");
  }
  const [loading] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart") ?? [])
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setCartItems(cart);
    }
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  const total = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "VND",
  });

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
        return <Link to={`/san-pham/${data.slug}`}>{data.name}</Link>;
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
              onClick={() => {
                const itemToIncrease = cartItems.map((item) => {
                  if (item.id === data.id) {
                    return setCartItems((prev) => [...prev], item.quantity++);
                  } else {
                    return item;
                  }
                });
                return itemToIncrease;
              }}
            >
              +
            </Button>
            <h3>{data.quantity}</h3>
            <Button
              onClick={() => {
                if (data.quantity > 1) {
                  const itemToDecrease = cartItems.map((item) => {
                    if (item.id === data.id) {
                      return setCartItems((prev) => [...prev], item.quantity--);
                    } else {
                      return item;
                    }
                  });
                  return itemToDecrease;
                } else {
                  const itemToRemove = cartItems.filter((item) => {
                    return item.id !== data.id;
                  });
                  return setCartItems(itemToRemove);
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
          <Link
            onClick={() => {
              const itemToRemove = cartItems.filter((item) => {
                return item.id !== data.id;
              });
              return setCartItems(itemToRemove);
            }}
          >
            Xóa
          </Link>
        </Space>
      ),
    },
  ];

  const data = cartItems.map((product, index) => ({
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
      {currentUser.role === undefined  ? (
        <>
          <h2
            style={{
              textAlign: "center",
              paddingTop: 80,
            }}
          >
            Vui lòng <Link to={"/login"}>đăng nhập</Link> để xem giỏ hàng
          </h2>
        </>
      ) : (
        <>
          {cartItems.length > 0 ? (
            <>
              <Row>
                <Col span={16}>
                  <Table
                    columns={columns}
                    loading={loading}
                    dataSource={data}
                    pagination={false}
                  />
                  {cartItems.length > 0 && (
                    <div>
                      <h2 style={{ float: "right", paddingRight: 5 }}>
                        Total: {formatter.format(total)} VNĐ
                      </h2>
                    </div>
                  )}
                </Col>
                <Col span={8}>
                  <Form
                    {...layout}
                    style={{
                      paddingLeft: 10,
                    }}
                    name="nest-messages"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name={["user", "name"]}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={["user", "email"]}
                      rules={[
                        {
                          type: "email",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={["user", "age"]}
                      rules={[
                        {
                          type: "number",
                          min: 0,
                          max: 99,
                        },
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item name={["user", "website"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item name={["user", "introduction"]}>
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
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
        </>
      )}
    </div>
  );
};

export default Cart;
