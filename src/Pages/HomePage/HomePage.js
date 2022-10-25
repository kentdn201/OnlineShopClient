import { Layout, Card, Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import HeaderAsset from "../Layout/Header/Header";
import Category from "../Layout/Category/Category";
import CarouselAsset from "../Layout/Carousel/CarouselAsset";
import FooterAsset from "../Layout/Footer/FooterAsset";
const { Content } = Layout;

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

const { Meta } = Card;

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

const products = [
  {
    id: 1,
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "Sản phẩm A",
    price: 1000,
  },
  {
    id: 2,
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "Sản phẩm B",
    price: 2000,
  },
  {
    id: 3,
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "Sản phẩm C",
    price: 3000,
  },
  {
    id: 4,
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "Sản phẩm D",
    price: 3500,
  },
  {
    id: 5,
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "Sản phẩm E",
    price: 2500,
  },
  {
    id: 6,
    src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "Sản phẩm F",
    price: 4500,
  },
];

function HomePage() {
  return (
    <Layout>
      <HeaderAsset />
      <Category categories={categories} />
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
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={8} md={6} lg={8} xl={6}>
              <Link>
                <Card
                  hoverable
                  style={{
                    width: "auto",
                    marginTop: 8,
                  }}
                  cover={<img alt="example" src={product.src} />}
                >
                  <Meta
                    title={product.title}
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
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={8} md={6} lg={8} xl={6}>
              <Link>
                <Card
                  hoverable
                  style={{
                    width: "auto",
                    marginTop: 8,
                  }}
                  cover={<img alt="example" src={product.src} />}
                >
                  <Meta
                    title={product.title}
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
