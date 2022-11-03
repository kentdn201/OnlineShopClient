import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Category = ({ categories }) => {
  const categoryList = categories.map(
    (category) => (
      {
        key: category.id,
        label: <Link to={`danh-muc/${category.slug}`}>{category.name}</Link>,
      }
    )
  )

  return (
    <Menu style={{ padding: "0 50px" }} mode="horizontal" items={categoryList}>
    </Menu>
  );
};

export default Category;
