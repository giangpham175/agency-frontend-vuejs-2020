import request from "@/utils/request";

export function createOrder(data) {
    return request({
        url: "/agency/advertising/instagram/create-jobs",
        method: "post",
        data
    });
}
export function getOrders(params) {
    return request({
        url: "/agency/advertising/instagram/list-for-agency" + params,
        method: "get"
    });
}
