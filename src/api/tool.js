import request from "../utils/request";
import store from "@/store";
export function getTools() {
    return request({
        url: "api/tools?site_id=" + store.state.user.site.id,
        method: "get"
    });
}
