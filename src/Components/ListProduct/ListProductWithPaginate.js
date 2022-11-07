import { Button, Pagination } from "antd";
import React, { useState } from "react";
import ListProduct from "./ListProduct";

const ListProductWithPaginate = ({
  listProduct,
  currentPages,
  productsPerPages,
  showPaginate = false,
  showMore = false,
}) => {
  const [currentPage, setCurrentPage] = useState(currentPages);
  const [productsPerPage, setProductsPerPage] = useState(productsPerPages);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = listProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleChangePage = (value) => {
    setCurrentPage(value);
  };

  const onLoadMore = () => {
    setProductsPerPage(productsPerPage + 4);
  };

  return (
    <div>
      <ListProduct productList={currentProducts} />
      {showPaginate ? (
        <>
          <Pagination
            defaultCurrent={1}
            total={listProduct.length}
            onChange={handleChangePage}
          />
        </>
      ) : (
        <></>
      )}

      {showMore ? (
        <>
          <div
            style={{
              textAlign: "center",
              marginTop: 12,
              height: 32,
              lineHeight: "32px",
            }}
          >
            <Button onClick={onLoadMore}>loading more</Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ListProductWithPaginate;
