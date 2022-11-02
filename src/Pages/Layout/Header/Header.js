import React, { useContext } from "react";
import { Cookies } from "react-cookie";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import CurrentUserContext from "../../../Share/Contexts/CurrentUserContext";

import { Link } from "react-router-dom";
import { Layout, Input, Dropdown, Space, Menu, Empty } from "antd";
const { Header } = Layout;

const linkCss = {
  float: "right",
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: 16,
};

const HeaderAsset = () => {
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const cookies = new Cookies();
  const { Search } = Input;

  const handleOnClick = () => {
    setCurrentUser({})
    cookies.remove('token');
    sessionStorage.removeItem('key')
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="1" onClick={handleOnClick}>Logout</Menu.Item>
    </Menu>
  );

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
              <Dropdown
                className="dropdown-btn"
                overlay={userMenu}
                
              >
                <Link style={linkCss}> <UserOutlined /> Hello {currentUser.firstName} </Link>
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
