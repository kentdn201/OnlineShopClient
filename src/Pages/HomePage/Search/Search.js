import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListProductWithPaginate from "../../../Components/ListProduct/ListProductWithPaginate";
import ProductApiURL from "../../../Share/ApiURL/ProductApiURL";
import isLoadingComponent from "../../../Components/isLoading/isLoadingComponent";

const Search = () => {
  let keyword = useParams().keyword;

  if (keyword == undefined) {
    keyword = "";
  }

  const [searchProducts, setSearchProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${ProductApiURL.productsSearch}${keyword}`).then((response) => {
      setSearchProduct(response.data);
      setIsLoading(false);
    });
  }, [keyword]);

  return (
    <div>
      {isLoading ? (
        <>
            <isLoadingComponent/>
        </>
      ) : (
        <>
          <h2
            style={{
              textAlign: "center",
              margin: 10,
            }}
          >
            Tìm Kiếm
          </h2>
          <ListProductWithPaginate
            listProduct={searchProducts}
            currentPages={1}
            productsPerPages={8}
            showMore={true}
          />
        </>
      )}
    </div>
  );
};

export default Search;
