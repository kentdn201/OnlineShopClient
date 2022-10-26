import { Layout, Card, Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import HeaderAsset from "../Layout/Header/Header";
import Category from "../Layout/Category/Category";
import CarouselAsset from "../Layout/Carousel/CarouselAsset";
import FooterAsset from "../Layout/Footer/FooterAsset";
import axios from "axios";
const { Content } = Layout;

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

const { Meta } = Card;

function HomePage({categories}) {
  const [productList, setProductList] = useState([])

  useEffect(() => {
      axios.get("http://localhost:8080/product/all").then(response => {
        setProductList(response.data)
      })
  }, [])

  return (
    <Layout>
      <CarouselAsset />
      <Content
        className="site-layout"
        style={{
          padding: "0 64px",
          marginTop: 64,
        }}
      >
        <Card title="Danh Mục">
          {categories.map((category) => (
            <Card.Grid style={gridStyle} key={category.id}>
              <Link>
                <img alt="example" src={category.src} />
              </Link>
            </Card.Grid>
          ))}
        </Card>
      </Content>

      <Content
        className="site-layout"
        style={{
          padding: "0 64px",
          marginTop: 64,
        }}
      >
        <div style={{ fontSize: 24 }}>
          Sản Phẩm Mới
          <Link style={{ float: "right", fontSize: 16, paddingTop: 10 }}>
            Xem Thêm {">"}
          </Link>
        </div>

        <Row gutter={16}>
          {productList.map((product) => (
            <Col key={product.id} xs={24} sm={8} md={6} lg={8} xl={6}>
              <Link to={product.slug}>
                <Card
                  hoverable
                  style={{
                    width: "auto",
                    marginTop: 8,
                  }}
                  cover={<img alt="example" src={`./images/${product.image}`} />}
                >
                  <Meta
                    title={product.name}
                    description={product.price.toString() + " VNĐ"}
                  />
                </Card>
                <Button
                  style={{
                    width: "100%",
                    border: "none",
                  }}
                >
                  Xem Thông Tin
                </Button>
              </Link>
            </Col>
          ))}
        </Row>
      </Content>
      <FooterAsset />
    </Layout>
  );
}

export default HomePage;
