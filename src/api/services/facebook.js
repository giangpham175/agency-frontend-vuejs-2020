import request from "@/utils/request";

export function createOrder(data) {
    return request({
        url: "/agency/advertising/facebook/create-jobs",
        method: "post",
        data
    });
}

export function getOrders(params) {
    return request({
        url: "/advertising/advertisers" + params,
        method: "get"
    });
}

export function convertUsernameToFbId(data) {
    return request({
        url: "/system/get-uid-from-username",
        method: "post",
        data
    });
}
