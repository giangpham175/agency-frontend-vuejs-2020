import request from "../utils/request";
import store from "../store";

export function getAllUser(param) {
    return request({
        url: "admin/users/list?site_id=" + store.state.user.site.id + param,
        method: "get"
    });
}
export function updateInfoUser(data) {
    return request({
        url: "/users/" + data.id,
        method: "post",
        data
    });
}
