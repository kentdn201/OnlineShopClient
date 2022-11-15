import React, { useContext, useEffect } from "react";
import { Button, Form, Input, Layout, Breadcrumb, notification } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { useState } from "react";
import CategoryApiURL from "../../../Share/ApiURL/CategoryApiURL";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

const EditCategory = () => {
  const slug = useParams().slug;
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  const [error, setError] = useState("");
  const [categoryEditPage, setCategoryEditPage] = useState({
    name: "",
    slug: "",
    image: "",
  });
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Edit Fail",
      description: "Vui lòng nhập lại thông tin",
    });
  };

  const openNotificationWithIconSuccess = (type) => {
    notification[type]({
      message: "Edit Thành Công",
    });
  };

  useEffect(() => {
    axios
      .get(`${CategoryApiURL.categoryURL}/${slug}`)
      .then((response) => {
        setCategoryEditPage(response.data);
        document.title = `${response.data.name}`;
        form.setFieldsValue({
          name: response.data.name,
          image: response.data.image,
          slug: response.data.slug,
        });
      })
      .catch(() => {});
  }, []);

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

  const handleOnFinish = (values) => {
    console.log(values);
    axios.put(`${CategoryApiURL.categoryURLUpdate}/${values.slug}`, values)
    .then((response) => {
      openNotificationWithIconSuccess("success");
      navigate("/admin/category");
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
            <Link to={"/admin"}>Trang Chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>{categoryEditPage.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={handleOnFinish}
        >
          <Form.Item
            name="name"
            label="Tên Danh Mục"
            rules={rules("Tên Danh Mục", 5, 100)}
          >
            <Input placeholder="Nhập Tên Danh Mục" disabled />
          </Form.Item>
          <Form.Item
            name="image"
            label="Đường dẫn hình ảnh"
            rules={rules("Đường dẫn hình ảnh", 5, 50000)}
          >
            <Input placeholder="Nhập Đường Dẫn Hình Ảnh" />
          </Form.Item>
          <Form.Item name="slug" label="Slug" rules={rules("Slug", 3, 100)}>
            <Input placeholder="Nhập Slug (Đường Dẫn Đến Sản Phẩm Trên URL) Của Sản Phẩm" disabled/>
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
              Sửa Danh Mục
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default EditCategory;
