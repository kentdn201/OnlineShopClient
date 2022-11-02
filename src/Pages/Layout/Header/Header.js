import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import CurrentUserContext from "../../../Share/Contexts/CurrentUserContext";

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
  const cookies = new Cookies();
  const { Search } = Input;

  const handleOnClick = () => {
    setCurrentUser({});
    cookies.remove("token");
    navigate("/")
    sessionStorage.removeItem("key");
  };

  const userMenu = (
    <Menu>
      {currentUser.role === "Admin" ? (
        <Menu.Item key="1">
          <Link to={"/admin/"}> Admin</Link>
        </Menu.Item>
      ) : (
        <></>
      )}
      <Menu.Item key="2" onClick={handleOnClick}>
        Logout
      </Menu.Item>
    </Menu>
  );

  console.log(currentUser.role === "Admin");

  return (
    <div>
      <Header style={{ zIndex: 1, width: "100%" }}>
        <Link to="/" style={{ margin: 16, fontSize: 24 }}>
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
