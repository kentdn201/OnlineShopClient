import ApiURL from "./ApiURL";

const OrderStatusApiURL = {
    allOrderStatus: `${ApiURL.Api}/status/all`,
    addOrderStatus: `${ApiURL.Api}/status/create/`,
    editOrderStatus: `${ApiURL.Api}/status/edit`,
}

export default OrderStatusApiURL;