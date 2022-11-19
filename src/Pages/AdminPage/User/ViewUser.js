import React, { useContext, useEffect } from "react";
import {
  Button,
  Form,
  Layout,
  Breadcrumb,
  notification,
  Modal,
  Select,
} from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { useState } from "react";
import UserApiURL from "../../../Share/ApiURL/UserApiURL";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

const ViewUser = () => {
  const navigate = useNavigate();
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = useParams().userId;

  useEffect(() => {
    axios.get(`${UserApiURL.getUserApi}/${userId}`).then((response) => {
      setUser(response.data);
      document.title = `${response.data.firstName}`;
    });
  }, [userId]);

  if (performance.getEntriesByType("navigation")[0].type) {
    setCurrentHeader("Admin");
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log(values);
    axios
      .put(`${UserApiURL.usersEditApi}/${user.id}`, values)
      .then((response) => {
        openNotificationWithIconSuccess("success");
        navigate("/admin/nguoi-dung");
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
          <Breadcrumb.Item>
            {user.firstName + " " + user.lastName}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Form {...layout} name="basic">
          <Form.Item label="Tên Người Dùng">
            {user.firstName + " " + user.lastName}
          </Form.Item>
          <Form.Item name="email" label="Email">
            {user.email}
          </Form.Item>

          <Form.Item name="role" label="Role">
            {user.role}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 6,
            }}
          >
            <Button
              style={{
                marginBottom: 15,
              }}
              type="primary"
              onClick={showModal}
            >
              Cập nhật trạng thái của tải khoản
            </Button>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <Form onFinish={onFinish}>
                <Form.Item
                  name="userStatus"
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
                      user.userStatus === "None" ? (
                        "Tốt"
                      ) : user.userStatus === "Disabled" ? (
                        "Đã Bị Vô Hiệu Hóa"
                      ) : (
                        <></>
                      )
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
                        label: "Tốt",
                      },
                      {
                        value: 1,
                        label: "Vô Hiệu Hóa Tài Khoản",
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
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default ViewUser;
