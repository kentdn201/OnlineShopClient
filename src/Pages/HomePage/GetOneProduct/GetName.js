import axios from "axios";
import React, { useEffect, useState } from "react";
import ApiURL from "../../../Share/ApiURL/ApiURL";
import { Link } from "react-router-dom";

const GetName = ({ productId }) => {
  const [product, setProduct] = useState({
    id: null,
    name: null,
    slug: null,
  });

  useEffect(() => {
    axios
      .get(`${ApiURL.Api}/product/san-pham/${productId}`)
      .then((response) => {
        setProduct(response.data);
      });
  }, [productId]);

  return (
    <div>
      <Link to={`/san-pham/${product.slug}`}>{product.name}</Link>
    </div>
  );
};

export default GetName;
