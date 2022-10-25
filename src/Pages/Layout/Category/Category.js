import { Menu } from "antd";

import React from "react";
import { Link } from "react-router-dom";

const Category = ({ categories }) => {
  return (
    <Menu style={{ padding: "0 50px" }} mode="horizontal">
      {categories.map((category) => (
          <Menu.Item  key={category.id}>
            <Link>{category.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Category;
