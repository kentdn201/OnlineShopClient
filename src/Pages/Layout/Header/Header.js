import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import CurrentUserContext from "../../../Share/Contexts/CurrentUserContext";
import CurrentHeaderContext from "../../../Share/Contexts/CurrentHeaderContext";

import { Link } from "react-router-dom";
import { Layout, Input, Dropdown, Menu } from "antd";
const { Header } = Layout;

const linkCss = {
  float: "right",
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: 16,
};

const HeaderAsset = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { setCurrentHeader } = useContext(CurrentHeaderContext);
  const cookies = new Cookies();
  const { Search } = Input;

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
      label: <Link onClick={handleLogout}> Đăng xuất</Link>,
    },
  ];

  const dropDownUser = [
    {
      key: "1",
      label: <Link onClick={handleLogout}> Đăng xuất</Link>,
    },
  ];

  const userMenu =
    currentUser.role === "Admin" ? (
      <>
        <Menu items={dropDownAdmin}/>
      </>
    ) : (
      <>
        <Menu items={dropDownUser}/>
      </>
    );

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
