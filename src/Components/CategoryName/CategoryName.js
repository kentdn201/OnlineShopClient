import axios from "axios";
import { useState, useEffect } from "react";

const CategoryName = ({categoryId}) => {
  const [category, setCategory] = useState({
    name: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/category/danh-muc/${categoryId}`)
      .then((response) => {
        setCategory(response.data);
      });
  }, [categoryId]);

  return <div>{category.name === null ? <></> : <>{category.name}</>}</div>;
};

export default CategoryName;
