import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import CurrentUserContext from "../../../Share/Contexts/CurrentUserContext";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";

import { Link } from "react-router-dom";
import { Layout, Input, Dropdown, Menu } from "antd";
import { useEffect } from "react";
const { Header } = Layout;

const linkCss = {
  float: "right",
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: 16,
};

const HeaderAsset = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const length = cart.length;

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  const cookies = new Cookies();
  const [count, setCount] = useState(length);
  const { Search } = Input;
  const [keyword, setKeyword] = useState("");

  const userId = currentUser.id;

  useEffect(() => {
    setCount(length);
  }, [length]);

  useEffect(() => {
    if (length === 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });

  const navigate = useNavigate();

  const handleHome = () => {
    setCurrentHeader("Home");
  };

  const handleAdmin = () => {
    setCurrentHeader("Admin");
  };

  const handleLogout = () => {
    setCurrentUser({});
    cookies.remove("token");
    sessionStorage.removeItem("key");
    localStorage.removeItem("cart");
    window.location.replace("/");
    setCurrentHeader("Home");
  };

  const dropDownAdmin = [
    {
      key: "1",
      label: (
        <Link to={"/admin/"} onClick={handleAdmin}>
          {" "}
          Admin
        </Link>
      ),
    },
    {
      key: "2",
      label: <Link to={`/order/${userId}`}> Danh Sách Đơn Hàng</Link>,
    },
    {
      key: "3",
      label: <Link onClick={handleLogout}> Đăng xuất</Link>,
    },
  ];

  const dropDownUser = [
    {
      key: "1",
      label: <Link to={`/order/${userId}`}> Danh Sách Đơn Hàng</Link>,
    },
    {
      key: "2",
      label: <Link onClick={handleLogout}> Đăng xuất</Link>,
    },
  ];

  const userMenu = currentUser.roles.find((e) => e.roleCode === "ADMIN") ? (
    <>
      <Menu items={dropDownAdmin} />
    </>
  ) : (
    <>
      <Menu items={dropDownUser} />
    </>
  );

  const handleFinish = () => {
    navigate(`/product/search/${keyword}`);
  };
  return (
    <div>
      <Header style={{ zIndex: 1, width: "100%" }}>
        <Link to="/" style={{ margin: 16, fontSize: 24 }} onClick={handleHome}>
          Home
        </Link>
        {currentUser.firstName === undefined ? (
          <>
            <Link to="/login" style={linkCss}>
              <UserOutlined /> Login
            </Link>
          </>
        ) : (
          <>
            <div style={linkCss}>
              <Dropdown className="dropdown-btn" overlay={userMenu}>
                <Link style={linkCss}>
                  {" "}
                  <UserOutlined /> Hello {currentUser.firstName}{" "}
                </Link>
              </Dropdown>
            </div>
          </>
        )}

        <Link to="/cart" style={linkCss}>
          <ShoppingCartOutlined /> Cart {count === 0 ? <></> : <>({count})</>}
        </Link>

        <Search
          placeholder="Search someting...."
          style={{
            width: "auto",
            height: "auto",
            float: "right",
            margin: 16,
          }}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            document.title = `${e.target.value}`;
          }}
          onSearch={handleFinish}
        />
      </Header>
    </div>
  );
};

export default HeaderAsset;
