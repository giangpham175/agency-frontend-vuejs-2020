import request from "../utils/request";

export function getSiteConfig(siteHost) {
    siteHost = "http://" + siteHost;
    siteHost = siteHost.replace("http://www.", "http://");
    return request({
        url: "api/site/get-config?domain=" + siteHost,
        method: "get"
    });
}
