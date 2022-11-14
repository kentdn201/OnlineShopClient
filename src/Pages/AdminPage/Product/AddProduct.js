import React, { useContext } from "react";
import { Button, Form, Input, Layout, Breadcrumb, Select, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { useState } from "react";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

const AddProduct = ({ categories }) => {
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const addProductURL = "http://localhost:8080/product/add";

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Add Fail",
      description: "Please fill information of new user again",
    });
  };

  const openNotificationWithIconSuccess = (type) => {
    notification[type]({
      message: "Add Successfully",
    });
  };

  const rules = (name, min, max) => [
    {
      validator: (_, value) => {
        const lengthMin = min;
        const lengthMax = max;
        if (value <= 0) {
          return Promise.reject(new Error(`Vui lòng nhập ${name}`));
        } else if (value.length < lengthMin || value.length > lengthMax) {
          return Promise.reject(
            new Error(`${name} ít nhất ${min} - ${max} kí tự`)
          );
        }
        return Promise.resolve();
      },
    },
  ];

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Admin");
  }
  const onFinish = (values) => {
    values.price = parseInt(values.price);

    // Thêm sản phẩm
    axios
      .post(addProductURL, values)
      .then((response) => {
        openNotificationWithIconSuccess("success");
        navigate("/admin");
      })
      .catch((err) => {
        setError(err.response.data);
        openNotificationWithIcon("error");
      });
  };
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
            margin: "16px 0px",
          }}
        >
          <Breadcrumb.Item>
            <Link to={"/"}>Trang Chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Thêm Sản Phẩm</Breadcrumb.Item>
        </Breadcrumb>
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên Sản Phẩm"
            rules={rules("Tên Sản Phẩm", 5, 100)}
          >
            <Input placeholder="Nhập Tên Sản Phẩm" />
          </Form.Item>
          <Form.Item
            name="imageURL"
            label="Đường dẫn hình ảnh"
            rules={rules("Đường dẫn hình ảnh", 5, 50000)}
          >
            <Input placeholder="Nhập Đường Dẫn Hình Ảnh" />
          </Form.Item>
          <Form.Item name="slug" label="Slug" rules={rules("Slug", 3, 100)}>
            <Input placeholder="Nhập Slug (Đường Dẫn Đến Sản Phẩm Trên URL) Của Sản Phẩm" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[
              {
                validator: (_, value) => {
                  let length = 2;
                  if (value.length < 0) {
                    return Promise.reject(new Error("Vui lòng nhập giá"));
                  } else if (/\D/.test(value)) {
                    return Promise.reject(
                      new Error("Vui lòng nhập số cho giá của sản phẩm")
                    );
                  } else if (value.length < length || value.length > 100) {
                    return Promise.reject(
                      new Error("Vui lòng nhập giá có từ 2 - 100 kí tự")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="Nhập Giá Của Sản Phẩm" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={rules("Mô tả", 5, 1000)}
          >
            <TextArea placeholder="Nhập Mô Tả Của Sản Phẩm" />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Danh Mục"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn Danh Mục"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 6,
            }}
          >
            <div>
            {error.message === "Slug này đã tồn tại trong hệ thống" ? (
              <p style={{ color: "#CF2338" }}>
                Slug này đã tồn tại trong hệ thống
              </p>
            ) : (
              <></>
            )}
          </div>
            <Button type="primary" htmlType="submit">
              Thêm Mới
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default AddProduct;
