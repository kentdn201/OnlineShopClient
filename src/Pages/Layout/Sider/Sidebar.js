import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const SideBar = () => {
  const Items = [
    {
      key: "1",
      label: "Quản Lý Người Dùng",
      children: [
        {
          key: "child-user-1",
          label: <Link to={"/admin/nguoi-dung"}>Danh Sách Người Dùng</Link>,
        },
      ],
    },
    {
      key: "2",
      label: "Sản Phẩm",
      children: [
        {
          key: "child-product-1",
          label: <Link to={"/admin"}>Danh Sách Sản Phẩm</Link>,
        },
        {
          key: "child-product-2",
          label: <Link to={"/admin/product/add"}>Thêm Sản Phẩm Mới</Link>,
        },
      ],
    },
    {
      key: "3",
      label: "Danh Mục",
      children: [
        {
          key: "child-cate-1",
          label: <Link to={"/admin/category/"}>Danh Sách Danh Mục</Link>,
        },
        {
          key: "child-cate-2",
          label: <Link to={"/admin/category/add"}>Thêm Một Danh Mục Mới</Link>,
        },
      ],
    },
    {
      key: "4",
      label: "Đơn Đặt Hàng",
      children: [
        {
          key: "child-order-1",
          label: <Link to={"/admin/don-hang"}>Danh Sách Đơn Đặt Hàng</Link>,
        },
        {
          key: "child-order-2",
          label: <Link to={"/admin/trang-thai-don-hang"}>Danh Sách Trạng Thái Đơn Hàng</Link>,
        },
      ],
    },
  ];

  return (
    <Sider style={{width:200, height:"100%", float:"left"}} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={Items}
      />
    </Sider>
  );
};

export default SideBar;
