import { Layout, Card } from "antd";
import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import CarouselAsset from "../Layout/Carousel/CarouselAsset";
import FooterAsset from "../Layout/Footer/FooterAsset";
import ListProduct from "../../Components/ListProduct/ListProduct";
import axios from "axios";
const { Content } = Layout;

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

function HomePage({categories}) {
  const [listProduct, setListProduct] = useState([])

  useEffect(() => {
      axios.get("http://localhost:8080/product/all").then(response => {
        setListProduct(response.data)
        document.title="Online Shop"
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
              <Link to={`danh-muc/${category.slug}`}>
                <img alt={category.name} src={category.image} />
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

        <ListProduct productList={listProduct}/>
      </Content>
      <FooterAsset />
    </Layout>
  );
}

export default HomePage;
