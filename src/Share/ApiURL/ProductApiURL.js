import ApiURL from "./ApiURL";

const ProductApiURL = {
    productsURL: `${ApiURL.Api}/product/all`,
    productsSearch: `${ApiURL.Api}/product/search?keyword=`,
    productEdit: `${ApiURL.Api}/product/update`,
    productDelete: `${ApiURL.Api}/product/delete`,
}

export default ProductApiURL;