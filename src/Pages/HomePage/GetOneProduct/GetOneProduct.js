import { Button, Row, Col } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListProduct from "../../../Components/ListProduct/ListProduct";

const GetOneProduct = () => {
  const [product, setProduct] = useState({});
  const [listProduct, setListProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const slug = useParams().slug;

  useEffect(() => {
    axios.get(`http://localhost:8080/product/${slug}`).then((response) => {
      setProduct(response.data);
      setCategory(response.data.category.slug);
      document.title=`${response.data.name}`
    });
  }, [slug]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/category/${category}/san-pham`)
      .then((response) => {
        setListProduct(response.data);
        console.log(response.data);
      });
  }, [category]);

  return (
    <div>
      <div className="title" style={{ margin: "4px 16px", padding: "0 50px" }}>
        <h4>
          Trang Chủ -{">"} {product.name}
        </h4>
      </div>
      <Row style={{ margin: 16, padding: "0 50px" }}>
        <Col span={12} xs={18} sm={24} md={18} lg={16} xl={12}>
          <h2>{product.name}</h2>
          <img
            alt="example"
            src={`${product.imageURL}`}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={12} xs={18} sm={24} md={18} lg={16} xl={12}>
          <br />
          <br />
          <h2>Mô tả sản phẩm: {product.description}</h2>
          <h4 style={{ marginTop: 10 }}>Giá: {product.price} VNĐ</h4>
          <Button style={{ marginTop: 10 }}>Thêm Sản Phẩm Vào Giỏ Hàng</Button>
        </Col>
      </Row>

      <div style={{ margin: 16, padding: "0 50px" }}>
        <h4>Các sản phẩm tương tự</h4>
        {/* 1 component hiển thị ra list sản phẩm theo category của sản phẩm này chuyền vào đó tham số slug của category theo sản phẩm này */}
        <ListProduct productList={listProduct} />
      </div>
    </div>
  );
};

export default GetOneProduct;
