import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ListProduct = ({ productList }) => {
  return (
    <Row gutter={16}>
      {productList.map((product) => (
        <Col key={product.id} xs={24} sm={8} md={6} lg={8} xl={6}>
          <Link to={`/san-pham/${product.slug}`}>
            <Card
              hoverable
              style={{
                width: "auto",
                marginTop: 8,
              }}
              cover={<img alt="example" src={`${product.imageURL}`} />}
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
  );
};

export default ListProduct;
