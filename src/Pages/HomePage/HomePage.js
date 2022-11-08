import { Layout, Card } from "antd";
import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import CarouselAsset from "../Layout/Carousel/CarouselAsset";
import FooterAsset from "../Layout/Footer/FooterAsset";
import axios from "axios";
import ListProductWithPaginate from "../../Components/ListProduct/ListProductWithPaginate";
import ProductApiURL from "../../Share/ApiURL/ProductApiURL";
const { Content } = Layout;

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

function HomePage({categories}) {
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
      axios.get(`${ProductApiURL.productsURL}`).then(response => {
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
                <img width={128} alt={category.name} src={category.image} />
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

        <ListProductWithPaginate listProduct={listProduct} currentPages={1} productsPerPages={8}/>
      </Content>
      <FooterAsset />
    </Layout>
  );
}

export default HomePage;
