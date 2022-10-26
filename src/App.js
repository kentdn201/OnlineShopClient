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

// fake data
const categories = [
  {
    id: 1,
    label: "Điện Thoại",
    src: "https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-mobile.png",
  },
  {
    id: 2,
    label: "Máy Tính Bảng",
    src: "https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-pc.png",
  },
  {
    id: 3,
    label: "Phụ Kiện",
    src: "https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-pc.png",
  },
  {
    id: 4,
    label: "Đồng Hồ",
    src: "https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-pc.png",
  },
  {
    id: 5,
    label: "PC - Lắp Ráp",
    src: "https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-pc.png",
  },
  {
    id: 6,
    label: "Thiết Bị Thông Minh",
    src: "https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-pc.png",
  },
  {
    id: 7,
    label: "Gia Dụng",
    src: "https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-pc.png",
  },
  {
    id: 8,
    label: "Màn Hình",
    src: "https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-pc.png",
  },
];

function App() {
  return (
    <div className="main">
    <BrowserRouter>
      <HeaderAsset />
      <Category categories={categories} />
      <Routes>
        <Route key="/" path="/" element={<HomePage categories={categories}/>}/>
        <Route path="/:slug" element={<GetOneProduct/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
