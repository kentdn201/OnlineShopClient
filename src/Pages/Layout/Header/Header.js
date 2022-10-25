import React from "react";

import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { Layout, Input } from "antd";
const { Header } = Layout;

const linkCss = {
  float: "right",
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: 16,
};

const HeaderAsset = () => {
  const { Search } = Input;

  return (
    <div>
      <Header style={{ zIndex: 1, width: "100%" }}>
        <Link to="/" style={{ margin: 16, fontSize: 24 }}>
          Home
        </Link>

        <Link
          to="/"
          style={linkCss}
        >
          <UserOutlined /> Login
        </Link>

        <Link
          to="/cart"
          style={linkCss}
        >
          <ShoppingCartOutlined /> Cart
        </Link>

        <Search
          placeholder="Search someting...."
          style={{
            width: "auto",
            height: "auto",
            float: "right",
            margin: 16,
          }}
        />
      </Header>
    </div>
  );
};

export default HeaderAsset;
