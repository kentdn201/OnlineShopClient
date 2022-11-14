import ApiURL from "./ApiURL";

const OrderApiURL = {
    allOrder: `${ApiURL.Api}/order/all`,
    addOrder: `${ApiURL.Api}/order/create/`,
    getAllOrderByUser: `${ApiURL.Api}/order/`,
    orderDetailByUser: `${ApiURL.Api}/order/don-hang/`
}

export default OrderApiURL;