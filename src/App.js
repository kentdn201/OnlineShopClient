import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import "antd/dist/antd.min.css";
import GetOneProduct from "./Pages/HomePage/GetOneProduct/GetOneProduct";
import HeaderAsset from "./Pages/Layout/Header/Header";
import Category from "./Pages/Layout/Category/Category";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies, CookiesProvider } from "react-cookie";
import GetProductsByCategory from "./Pages/HomePage/Category/GetProductsByCategory";
import Login from "./Pages/HomePage/Login/Login";
import CurrentUserContext from "./Share/Contexts/CurrentUserContext";
import CurrentHeaderContext from "./Share/Contexts/CurrentHeaderContext";
import AdminPage from "./Pages/AdminPage/AdminPage";
import ListProduct from "./Pages/AdminPage/Product/ListProduct";

function App() {
  const cookies = new Cookies();
  const [categories, setCategorise] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentHeader, setCurrentHeader] = useState("Home");
  const tokenDecryption = cookies.get("token");

  useEffect(() => {
    if (tokenDecryption === undefined) {
      setCurrentUser({});
      setCurrentHeader("Home");
    } else {
      axios
        .get(`http://localhost:8080/user/${tokenDecryption.message}/get`)
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

  return (
    <div className="main">
      <BrowserRouter>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <CookiesProvider>
            <CurrentHeaderContext.Provider
              value={{ currentHeader, setCurrentHeader }}
            >
              <HeaderAsset />
              {currentHeader !== "Admin" ? (
                <>
                  <Category categories={categories} />
                </>
              ) : (
                <></>
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
                {tokenDecryption === undefined ? (
                  <>
                    <Route path="/login" element={<Login />} />
                  </>
                ) : (
                  <></>
                )}
                {currentUser.role === "Admin" ? (
                  <>
                    {/* For admin only */}
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/products" element={<ListProduct />} />
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
