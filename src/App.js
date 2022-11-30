import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import "antd/dist/antd.min.css";
import GetOneProduct from "./Pages/HomePage/GetOneProduct/GetOneProduct";
import HeaderAsset from "./Pages/Layout/Header/Header";
import Category from "./Pages/Layout/Category/Category";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Cookies, CookiesProvider } from "react-cookie";
import GetProductsByCategory from "./Pages/HomePage/Category/GetProductsByCategory";
import Login from "./Pages/HomePage/Login/Login";
import CurrentUserContext from "./Share/Contexts/CurrentUserContext";
import CurrentHeaderContext from "./Share/Contexts/CurrentHeaderContext";
import AdminPage from "./Pages/AdminPage/AdminPage";
import SideBar from "./Pages/Layout/Sider/Sidebar";
import AddProduct from "./Pages/AdminPage/Product/AddProduct";
import ViewProduct from "./Pages/AdminPage/Product/ViewProduct";
import CategoryList from "./Pages/AdminPage/Category/CategoryList";
import AddCategory from "./Pages/AdminPage/Category/AddCategory";
import Search from "./Pages/HomePage/Search/Search";
import Cart from "./Pages/HomePage/Cart/Cart";
import Order from "./Pages/HomePage/Order/Order";
import OrderDetail from "./Pages/HomePage/Order/OrderDetail";
import OrderList from "./Pages/AdminPage/Order/OrderList";
import EditProduct from "./Pages/AdminPage/Product/EditProduct";
import ViewCategory from "./Pages/AdminPage/Category/ViewCategory";
import EditCategory from "./Pages/AdminPage/Category/EditCategory";
import Signup from "./Pages/HomePage/Signup/Signup";
import OrderDetailAdmin from "./Pages/AdminPage/Order/OrderDetailAdmin";
import UserList from "./Pages/AdminPage/User/UserList";
import ViewUser from "./Pages/AdminPage/User/ViewUser";
import { notification } from "antd";
import ApiLogin from "./Share/ApiURL/ApiLogin";

function App() {
  const cookies = new Cookies();
  const [categories, setCategorise] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    roles: [],
    email: null,
    lastName: null,
  });
  const [currentHeader, setCurrentHeader] = useState("Home");
  const tokenDecryption = cookies.get("token");

  if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Đăng nhập thất bại",
      description:
        "Tài Khoản Của Bạn Đã Bị Vô Hiệu Hóa Vui Lòng Liên Hệ Admin Để Biết Thêm Thông Tin Chi Tiết",
    });
  };

  const header = `Authorization: Bearer ${tokenDecryption}`;

  useEffect(() => {
    if (tokenDecryption === undefined) {
      setCurrentUser({
        roles: [],
        email: null,
        lastName: null,
      });
      setCurrentHeader("Home");
    } else {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenDecryption}`;
      axios
        .get(`${ApiLogin.getUserUrl}`, { headers: { header } })
        .then((response) => {
          setCurrentUser(response.data);
        });
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/category/all").then((response) => {
      setCategorise(response.data);
    });
  }, []);

  if (currentUser.userStatus === "Disabled") {
    openNotificationWithIcon("error");
    setCurrentUser({});
    cookies.remove("token");
    sessionStorage.removeItem("key");
    localStorage.removeItem("cart");
    setCurrentHeader("Home");
  }

  return (
    <div className="main">
      <BrowserRouter>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <CookiesProvider>
            <CurrentHeaderContext.Provider
              value={{ currentHeader, setCurrentHeader }}
            >
              <HeaderAsset listProduct={categories} />
              {currentHeader !== "Admin" ? (
                <>
                  <Category categories={categories} />
                </>
              ) : (
                <>
                  <SideBar />
                </>
              )}
              <Routes>
                <Route
                  key="/"
                  path="/"
                  element={<HomePage categories={categories} />}
                />
                <Route path="/san-pham/:slug" element={<GetOneProduct />} />
                <Route
                  path="/danh-muc/:slug"
                  element={<GetProductsByCategory />}
                />
                <Route path="/product/search/" element={<Search />} />
                <Route path="/product/search/:keyword" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order/:id" element={<Order />} />
                <Route
                  path="/don-hang/:orderid/"
                  element={<OrderDetail />}
                />
                {tokenDecryption === undefined ? (
                  <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dang-ky" element={<Signup />} />
                  </>
                ) : (
                  <></>
                )}
                {currentUser.roles.length > 1 &&
                currentUser.roles.find((e) => e.roleCode === "ADMIN") ? (
                  <>
                    {/* For admin only */}
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/nguoi-dung" element={<UserList />} />
                    <Route
                      path="/admin/nguoi-dung/:userId"
                      element={<ViewUser />}
                    />
                    <Route
                      path="/admin/product/add"
                      element={<AddProduct categories={categories} />}
                    />
                    <Route
                      path="/admin/product/:slug"
                      element={<ViewProduct />}
                    />
                    <Route
                      path="/admin/product/:slug/edit"
                      element={<EditProduct categories={categories} />}
                    />
                    <Route path="/admin/category/" element={<CategoryList />} />
                    <Route
                      path="/admin/category/:slug"
                      element={<ViewCategory />}
                    />
                    <Route
                      path="/admin/category/:slug/edit"
                      element={<EditCategory />}
                    />
                    <Route
                      path="/admin/category/add"
                      element={<AddCategory />}
                    />
                    <Route path="/admin/don-hang/" element={<OrderList />} />
                    <Route
                      path="/admin/don-hang/:orderid/"
                      element={<OrderDetailAdmin />}
                    />
                  </>
                ) : (
                  <></>
                )}
              </Routes>
            </CurrentHeaderContext.Provider>
          </CookiesProvider>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
