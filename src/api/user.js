import request from "../utils/request";

export function getInfo() {
    return request({
        url: "api/me",
        method: "get"
    });
}
