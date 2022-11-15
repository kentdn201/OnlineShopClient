import { Button, Row, Col, Form } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListProduct from "../../../Components/ListProduct/ListProduct";
import LoadingComponent from "../../../Components/isLoadingComponent/LoadingComponent";

const GetOneProduct = () => {
  const [product, setProduct] = useState({});
  const [listProduct, setListProduct] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [categorySlug, setCategorySlug] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );

  const slug = useParams().slug;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setItems(cart);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    async function getProduct() {
      await axios
        .get(`http://localhost:8080/product/${slug}`)
        .then((response) => {
          setCategoryId(response.data.categoryId);
          setProduct(response.data);
          setIsLoading(false);
          document.title = `${response.data.name}`;
        });
    }
    getProduct();
  }, [slug]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/category/danh-muc/${categoryId}`)
      .then((response) => {
        setCategorySlug(response.data.slug);
        setIsLoading(false);
      });
  }, [categoryId]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/category/${categorySlug}/san-pham`)
      .then((response) => {
        setIsLoading(false);
        setListProduct(response.data);
      });
  }, [categorySlug]);

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "VND",
  });

  return (
    <div>
      {isLoading ? (
        <>
          <LoadingComponent />
        </>
      ) : (
        <></>
      )}
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
          <h4 style={{ marginTop: 10 }}>
            Giá: {formatter.format(product.price)} VNĐ
          </h4>
          <input type="hidden" value={(product.quantity = 1)} />
          <Form>
            <Button
              htmlType="submit"
              style={{ marginTop: 10 }}
              onClick={() => {
                const tempstate = items.filter(
                  (item) => product.id === item.id
                );
                if (tempstate.length > 0) {
                  return setItems((prev) => [...prev]);
                } else {
                  return setItems((prev) => [...prev, product]);
                }
              }}
            >
              Thêm Sản Phẩm Vào Giỏ Hàng
            </Button>
          </Form>
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
