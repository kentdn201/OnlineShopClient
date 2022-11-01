import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import 'antd/dist/antd.min.css';
import GetOneProduct from "./Pages/HomePage/GetOneProduct/GetOneProduct";
import HeaderAsset from "./Pages/Layout/Header/Header";
import Category from "./Pages/Layout/Category/Category";
import { useEffect, useState } from "react";
import axios from "axios";
import GetProductsByCategory from "./Pages/HomePage/Category/GetProductsByCategory";

function App() {
  const [categories, setCategorise] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/category/all").then(response => {
      setCategorise(response.data)
    })
  }, [])

  return (
    <div className="main">
    <BrowserRouter>
      <HeaderAsset />
      <Category categories={categories} />
      <Routes>
        <Route key="/" path="/" element={<HomePage categories={categories}/>}/>
        <Route path="/san-pham/:slug" element={<GetOneProduct/>}/>
        <Route path="/danh-muc/:slug" element={<GetProductsByCategory/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
