import { Space, Table, Layout, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";
import { Content } from "antd/lib/layout/layout";
import UserApiURL from "../../../Share/ApiURL/UserApiURL";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentHeader } = useContext(CurrentHeaderContext);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${UserApiURL.usersApi}`).then((response) => {
      setIsLoading(false);
      setUserList(response.data);
      document.title = `Admin / Danh Sách Người Dùng`;
    });
  }, []);

  const columns = [
    {
      title: "Tên Người Dùng",
      key: "fullName",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      render: (data) => <><div style={data.userStatus === "Disabled" ? {color:"red"} : {color:"green"}}>{data.fullName}</div></>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      render: (data) => <>{data}</>,
    },
    {
      title: "",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <Link to={`/admin/nguoi-dung/${data.id}`}>Xem chi tiết người dùng</Link>
        </Space>
      ),
    },
  ];

  const data = userList.map((user, index) => ({
    id: user.id,
    fullName: user.firstName +" "+ user.lastName,
    email: user.email,
    key: `user ${index}`,
    userStatus: user.userStatus
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
                <Breadcrumb.Item>Danh Sách Người Dùng</Breadcrumb.Item>
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

export default UserList;
