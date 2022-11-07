import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListProductWithPaginate from "../../../Components/ListProduct/ListProductWithPaginate";

const GetProductsByCategory = () => {
  const slug = useParams().slug;
  const [category, setCategory] = useState({});
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/category/${slug}`).then((response) => {
      document.title = response.data.name;
      setCategory(response.data);
    });
  }, [slug]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/category/${slug}/san-pham`)
      .then((response) => {
        setProductList(response.data);
      });
  }, [slug]);

  return (
    <div className="category-list">
      <h4>
        <Link to={"/"}>Trang chủ </Link> {"->"} {category.name}
      </h4>
      <ListProductWithPaginate listProduct={productList} currentPages={1} productsPerPages={8} showMore={true}/>

    </div>
  );
};

export default GetProductsByCategory;
