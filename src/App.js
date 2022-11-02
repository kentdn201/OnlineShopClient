import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import "antd/dist/antd.min.css";
import GetOneProduct from "./Pages/HomePage/GetOneProduct/GetOneProduct";
import HeaderAsset from "./Pages/Layout/Header/Header";
import Category from "./Pages/Layout/Category/Category";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import GetProductsByCategory from "./Pages/HomePage/Category/GetProductsByCategory";
import Login from "./Pages/HomePage/Login/Login";
import CurrentUserContext from "./Share/Contexts/CurrentUserContext";

function App() {
  const cookies = new Cookies();
  const [categories, setCategorise] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const tokenDecryption = cookies.get("token");

  useEffect(() => {
    if (tokenDecryption === undefined) {
      setCurrentUser({});
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
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        <HeaderAsset/>
        <Category categories={categories} />
        <Routes>
          <Route
            key="/"
            path="/"
            element={<HomePage categories={categories} />}
          />
          <Route path="/san-pham/:slug" element={<GetOneProduct />} />
          <Route path="/danh-muc/:slug" element={<GetProductsByCategory />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </CurrentUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
