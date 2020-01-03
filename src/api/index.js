import axios from "axios";
import store from "@/store";
import router from "@/router";
var api = {
    base: "https://fb-api.online/api",
    // ---------------------REQUEST---------------------------------------------
    request: async function(url, postData = {}) {
        return axios({
            url: url,
            method: Object["keys"](postData)["length"] ? "POST" : "GET",
            data: postData
        })
            .then(result => result.data)
            .catch(error => {
                console.log("request erroror");
                console.log(error);
                console.log(error.response);
                if (error.response) {
                    return error.response.data;
                } else {
                    return {
                        error: error.message
                    };
                }
                // return this.request(url, postData);
            });
    },
    request_api: async function(pathApi, postData = {}) {
        return axios({
            url: this.base + pathApi,
            method: Object["keys"](postData)["length"] ? "POST" : "GET",
            data: postData,
            headers: {
                Authorization: "Bearer " + store.state.token
            }
        })
            .then(result => {
                return result.data;
            })
            .catch(error => {
                console.log("request error");
                console.log(error);
                if (!error.response) {
                    // network error
                    router.push("/503");
                }
                if (error.response) {
                    // Ngon =))
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    // console.log(pathApi);
                    if (error.response.status === 401) {
                        store.commit("logout");
                    }
                    return error.response.data;
                }
                // return this.request_api(url, postData);
            });
    },
    fomatNumber(x) {
        return Number(x)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    username_to_uid: async function(username) {
        let data = await this.request_api("/fb-account/get-uid-from-username", { username: username });
        return data;
    },
    userGetLogs: async function() {
        let data = await this.request_api("/tool-logs?sort_by=desc&limit=500");
        return data;
    },
    paymentLogs: async function() {
        let data = await this.request_api("/tool-logs?sort_by=desc&action=admin_update_coin");
        return data;
    },
    // ---------------------NOTIFY---------------------------------------------
    getNotify: async function() {
        let data = await this.request_api("/notification?limit=50");
        return data;
    },
    updateNotify: async function(id) {
        let data = await this.request_api("/notification/update/" + id, { id });
        return data;
    },
    // ---------------------GET ACCESS TOKEN---------------------------------------------
    getTokenByCookie: async function(postData) {
        let data = await this.request_api("/apache/request", postData);
        return data;
    },
    // ------------SITE----------------------
    getSiteConfig: async function(siteHost) {
        siteHost = "http://" + siteHost;
        siteHost = siteHost.replace("http://www.", "http://");
        let data = await this.request_api("/site/get-config?domain=" + siteHost);
        return data;
    },
    // ------------AUTH----------------------
    verifyApiKey: async function(postData) {
        let data = await this.request_api("/verify-site", postData);
        return data;
    },
    login: async function(postData) {
        let data = await this.request_api("/login", postData);
        return data;
    },
    register: async function(postData) {
        let data = await this.request_api("/register", postData);
        return data;
    },
    // ------------USER INFO-------------------------------
    userUpdateInfo: async function(id, postData) {
        let data = await this.request_api("/users/" + id, postData);
        return data;
    },
    transCoin: async function(postData) {
        let data = await this.request_api("/users/coin/transaction", postData);
        return data;
    },
    me: async function() {
        let data = await this.request_api("/me");
        return data;
    },
    getToolsInfo: async function() {
        let data = await this.request_api("/tools?site_id=" + store.state.site.id);
        return data;
    },
    // -------------------Comment Thật----------------------------------
    commentGetLocations: async function() {
        let data = await this.request_api("/list/location");
        return data;
    },
    buffComments: async function(postData) {
        let data = await this.request_api("/comment", postData);
        return data;
    },
    logsComments: async function() {
        let data = await this.request_api("logs?page=1&limit=200&fb_id=&object_id=&type=comment");
        return data;
    },
    // ---------------------VIPLIKE---------------------------------------------
    vipLikeCreate: async function(postData) {
        let data = await this.request_api("/vip-likes/buy", postData);
        return data;
    },
    vipLikeUserList: async function() {
        let data = await this.request_api("/vip-likes/list?page=1&limit=200");
        return data;
    },
    vipLikeLogs: async function() {
        let data = await this.request_api("/logs?page=1&limit=200&fb_id=&object_id=&type=like&buff_by=vips_likes");
        return data;
    },
    vipLikeUpdateVip: async function(id, postData) {
        let data = await this.request_api("/vip-likes/update/" + id, postData);
        return data;
    },
    vipLikeDeleteVip: async function(id) {
        let data = await this.request_api("/vip-likes/delete/" + id, { id });
        return data;
    },
    vipLikeRenew: async function(fbid) {
        let data = await this.request_api("/vip-likes/renew", { fbid: fbid, vipMonth: 1 });
        return data;
    },
    // ---------------------BUFFLIKE---------------------------------------------
    // -------------------Like Thật----------------------------------
    getBuffLogs: async function(config) {
        let data = await this.request_api("/logs?" + config);
        return data;
    },
    getTransLogs: async function(config) {
        let data = await this.request_api("/buff-transaction?sort_by=DESC&" + config);
        return data;
    },
    buffLike: async function(postData) {
        let data = await this.request_api("/like", postData);
        return data;
    },
    // ---------------------Buff Comment---------------------------------------------
    // -------------------Auto Up Top----------------------------------
    setAutoUpTop: async function(postData) {
        let data = await this.request_api("/up-top-post/set", postData);
        return data;
    },
    updateAutoUpTop: async function(id, postData) {
        let data = await this.request_api("/up-top-post/update/" + id, postData);
        return data;
    },
    deleteAutoUpTop: async function(id) {
        let data = await this.request_api("/up-top-post/delete/" + id, { id });
        return data;
    },
    renewAutoUpTop: async function(postData) {
        let data = await this.request_api("/up-top-post/renew", postData);
        return data;
    },
    listAutoUpTop: async function() {
        let data = await this.request_api("/up-top-post");
        return data;
    },
    logsAutoUpTop: async function() {
        let data = await this.request_api("/up-top-post/logs");
        return data;
    },
    // ---------------------UCP---------------------------------------------
    ucpGetInfo: async function() {
        let data = await this.request_api("/ucp/info");
        return data;
    },
    ucpBuyVipMonthBackup: async function(postData) {
        let data = await this.request_api("/ucp/buy/month", postData);
        return data;
    },
    ucpGetGroup: async function() {
        let data = await this.request_api("/ucp/groups");
        return data;
    },
    ucpCreateGroup: async function(postData) {
        let data = await this.request_api("/ucp/groups", postData);
        return data;
    },
    ucpDeleteGroup: async function(id) {
        let data = await this.request_api("/ucp/groups/delete/" + id, { id });
        return data;
    },
    ucpGetDetailGroup: async function(id) {
        let data = await this.request_api("/ucp/groups/" + id);
        return data;
    },
    ucpAddAccountsToGroup: async function(postData) {
        let data = await this.request_api("/ucp/account", postData);
        return data;
    },
    ucpDeleteAccount: async function(id) {
        let data = await this.request_api("/ucp/account/delete/" + id, { id });
        return data;
    },
    ucpUpdateAccount: async function(id, postData) {
        let data = await this.request_api("/ucp/account/update/" + id, postData);
        return data;
    },
    ucpBackupAccount: async function(postData) {
        let data = await this.request_api("/ucp/action", postData);
        return data;
    },
    // ---------------------CARE---------------------------------------------
    // ----------Proxies----------
    proxyBuy: async function(postData) {
        let data = await this.request_api("/proxy/buy", postData);
        return data;
    },
    proxyList: async function() {
        let data = await this.request_api("/proxy?sort_by=desc&limit=1000");
        return data;
    },
    proxyUpdate: async function(id, postData) {
        let data = await this.request_api("/proxy/update/" + id, postData);
        return data;
    },
    proxyRenew: async function(postData) {
        let data = await this.request_api("/proxy/renew", postData);
        return data;
    },
    // ----------Group----------
    careCreateGroup: async function(postData) {
        let data = await this.request_api("/care/groups", postData);
        return data;
    },
    careGetGroup: async function() {
        let data = await this.request_api("/care/groups?sort_by=DESC&limit=500");
        return data;
    },
    careUpdateGroup: async function(id, postData) {
        let data = await this.request_api("/care/groups/update/" + id, postData);
        return data;
    },
    careDeleteGroup: async function(id) {
        let data = await this.request_api("/care/groups/delete/" + id, { id });
        return data;
    },
    // ----------Fb Account----------
    careGetFbAccount: async function(groupid) {
        let data;
        if (groupid === "all") {
            data = await this.request_api("/care/accounts?sort_by=DESC&limit=500");
            return data;
        } else {
            data = await this.request_api("/care/accounts?sort_by=DESC&group_id=" + groupid);
            return data;
        }
    },
    careGetAccountById: async function(accountId) {
        let data = await this.request_api("/care/accounts?account_id=" + accountId);
        return data;
    },
    careAddFbAccount: async function(postData) {
        let data = await this.request_api("/care/accounts", postData);
        return data;
    },
    careDeleteFbAccount: async function(id) {
        let data = await this.request_api("/care/accounts/delete/" + id, { id });
        return data;
    },
    careUpdateFbAccount: async function(id, postData) {
        // chủ yếu để update status account
        let data = await this.request_api("/care/accounts/update/" + id, postData);
        return data;
    },
    // ----------botlike----------
    botReactionCreate: async function(postData) {
        let data = await this.request_api("/care/bot-likes/buy", postData);
        return data;
    },
    botReactionUserList: async function() {
        let data = await this.request_api("/care/bot-likes/list?sort_by=DESC");
        return data;
    },
    botReactionRenew: async function(postData) {
        let data = await this.request_api("/care/bot-likes/renew", postData);
        return data;
    },
    botReactionUpdate: async function(id, postData) {
        let data = await this.request_api("/care/bot-likes/update/" + id, postData);
        return data;
    },
    botReactionDelete: async function(id) {
        let data = await this.request_api("/care/bot-likes/delete/" + id, { id });
        return data;
    },
    // ----------botJobShare----------
    careShareJobLog: async function() {
        let data = await this.request_api("/care/job-share/logs?sort_by=DESC");
        return data;
    },
    careShareJobLogForBot: async function(config) {
        let data;
        if (config) {
            data = await this.request_api("/care/job-share/get-log-for-bot?sort_by=DESC&" + config);
            return data;
        } else {
            data = await this.request_api("/care/job-share/get-log-for-bot?sort_by=DESC");
            return data;
        }
    },
    botJobShareCreate: async function(postData) {
        let data = await this.request_api("/care/job-share/register", postData);
        return data;
    },
    botJobShareUserList: async function() {
        let data = await this.request_api("/care/job-share?sort_by=DESC&limit=1000");
        return data;
    },
    botJobShareUpdate: async function(id, postData) {
        let data = await this.request_api("/care/job-share/update/" + id, postData);
        return data;
    },
    botJobShareDelete: async function(id) {
        let data = await this.request_api("/care/job-share/remove", { id });
        return data;
    },
    getFreeList: async function(config) {
        let data;
        if (config) {
            data = await this.request_api("/care/job-share/get-list-free?" + config);
            return data;
        } else {
            data = await this.request_api("/care/job-share/get-list-free");
            return data;
        }
    },
    getListGroupPerson: async function(config) {
        let data;
        if (config) {
            data = await this.request_api("/care/job-share/get-list-group-person?" + config);
            return data;
        } else {
            data = await this.request_api("/care/job-share/get-list-group-person");
            return data;
        }
    },
    // ----------botcomment----------
    botCommentCreate: async function(postData) {
        let data = await this.request_api("/care/bot-comment/buy", postData);
        return data;
    },
    botCommentUserList: async function() {
        let data = await this.request_api("/care/bot-comment/list");
        return data;
    },
    botCommentRenew: async function(postData) {
        let data = await this.request_api("/care/bot-comment/renew", postData);
        return data;
    },
    botCommentUpdate: async function(id, postData) {
        let data = await this.request_api("/care/bot-comment/update/" + id, postData);
        return data;
    },
    botCommentDelete: async function(id) {
        let data = await this.request_api("/care/bot-comment/delete/" + id, { id });
        return data;
    },
    // ----------Auto Add Friends----------
    careAddFriendList: async function() {
        let data = await this.request_api("/care/add-friend/list?sort_by=DESC");
        return data;
    },
    careSetAddFriend: async function(postData) {
        let data = await this.request_api("/care/add-friend/set", postData);
        return data;
    },
    careUpdateAddFriend: async function(id, postData) {
        let data = await this.request_api("/care/add-friend/update/" + id, postData);
        return data;
    },
    careDeleteAddFriend: async function(id) {
        let data = await this.request_api("/care/add-friend/delete/" + id, { id });
        return data;
    },
    // --------Auto Accept Friends---------------
    careGetAcceptFriendList: async function() {
        let data = await this.request_api("/care/accept-friends");
        return data;
    },
    careSetAcceptFriend: async function(postData) {
        let data = await this.request_api("/care/accept-friends/set", postData);
        return data;
    },
    careUpdateAcceptFriend: async function(fbId, postData) {
        let data = await this.request_api("/care/accept-friends/update/" + fbId, postData);
        return data;
    },
    careDeleteAcceptFriend: async function(id) {
        let data = await this.request_api("/care/accept-friends/delete/" + id, { id });
        return data;
    },
    // --------Auto Remove Friends---------------
    careGetRemoveFriendList: async function() {
        let data = await this.request_api("/care/remove-friends");
        return data;
    },
    careSetRemoveFriend: async function(postData) {
        let data = await this.request_api("/care/remove-friends/set", postData);
        return data;
    },
    careDeleteRemoveFriend: async function(id) {
        let data = await this.request_api("/care/remove-friends/delete/" + id, { id });
        return data;
    },
    // ---------Uid clone---------------------
    careUidCloneList: async function() {
        let data = await this.request_api("/care/clone-uid");
        return data;
    },
    careUidCloneSet: async function(postData) {
        let data = await this.request_api("/care/clone-uid/set", postData);
        return data;
    },
    careUidCloneUpdate: async function(id, postData) {
        let data = await this.request_api("/care/clone-uid/update/" + id, postData);
        return data;
    },
    careUidCloneDelete: async function(id) {
        let data = await this.request_api("/care/clone-uid/delete", { id });
        return data;
    },
    // ---------CARE UCP---------------------
    careUCPBuy: async function(postData) {
        let data = await this.request_api("/care/ucp/buy-month", postData);
        return data;
    },
    careUCPUpdate: async function(id, postData) {
        let data = await this.request_api("/care/ucp/update/" + id, postData);
        return data;
    },
    // ---------CARE POKE FRIENDS
    botPokeBuy: async function(postData) {
        let data = await this.request_api("/care/bot-poke/buy", postData);
        return data;
    },
    botPokeUserList: async function() {
        let data = await this.request_api("/care/bot-poke/list");
        return data;
    },
    botPokeRenew: async function(postData) {
        let data = await this.request_api("/care/bot-poke/renew", postData);
        return data;
    },
    botPokeUpdate: async function(id, postData) {
        let data = await this.request_api("/care/bot-poke/update/" + id, postData);
        return data;
    },
    botPokeDelete: async function(id) {
        let data = await this.request_api("/care/bot-poke/delete/" + id, { id });
        return data;
    },
    // ---------------------VIP Live Stream---------------------------------------------
    vipLiveStreamCreate: async function(postData) {
        let data = await this.request_api("/vip-live-streams/buy", postData);
        return data;
    },
    vipLiveStreamUserList: async function() {
        let data = await this.request_api("/vip-live-streams/list?page=1&limit=200");
        return data;
    },
    vipLiveStreamUpdateVip: async function(id, postData) {
        let data = await this.request_api("/vip-live-streams/update/" + id, postData);
        return data;
    },
    vipLiveStreamDeleteVip: async function(id) {
        let data = await this.request_api("/vip-live-streams/delete/" + id, { id });
        return data;
    },
    vipLiveStreamRenew: async function(fbId) {
        let data = await this.request_api("/vip-live-streams/renew", { fb_id: fbId, months: 1 });
        return data;
    },
    // ---------------------Buff Review---------------------------------------------
    reviewBuff: async function(postData) {
        let data = await this.request_api("/review/buff", postData);
        return data;
    },
    reviewGetLogs: async function() {
        let data = await this.request_api("/review/logs?sort_by=DESC&limit=500");
        return data;
    },
    reviewRunning: async function() {
        let data = await this.request_api("/review/can-run?sort_by=DESC&limit=500");
        return data;
    },
    // ----------------------Auto Send Message-------------------------------------
    setAutoSendMessage: async function(postData) {
        let data = await this.request_api("/auto-send-message/set", postData);
        return data;
    },
    getLogsAutoSendMessage: async function() {
        let data = await this.request_api("/auto-send-message/logs?sort_by=DESC&limit=2000");
        return data;
    },
    getJobsAutoSendMessage: async function() {
        let data = await this.request_api("/auto-send-message/jobs");
        return data;
    },
    // -----------------------Scan-----------------------------------------------
    convertPhoneUID: async function(postData) {
        let data = await this.request_api("/convert/convert-uid-phone", postData);
        return data;
    },
    // ----------------------Care Seeding------------------------------------
    setCareSeeding: async function(postData) {
        let data = await this.request_api("/care/seeding/set", postData);
        return data;
    },
    careSeedingPendingJob: async function(config) {
        let data;
        if (config) {
            data = await this.request_api("/care/seeding/list-pending-job?sort_by=DESC&limit=2000&" + config);
            return data;
        } else {
            data = await this.request_api("/care/seeding/list-pending-job?sort_by=DESC&limit=2000");
            return data;
        }
    },
    careSeedingLogs: async function(config) {
        let data;
        if (config) {
            data = await this.request_api("/care/seeding/logs?sort_by=DESC&limit=2000&" + config);
            return data;
        } else {
            data = await this.request_api("/care/seeding/logs?sort_by=DESC&limit=2000");
            return data;
        }
    },
    // ----------------------Care Seeding------------------------------------
    setCareHappyBirthday: async function(postData) {
        let data = await this.request_api("/care/bot-happy-birthday/buy", postData);
        return data;
    },
    updateCareHappyBirthday: async function(fbId, postData) {
        let data = await this.request_api("/care/bot-happy-birthday/update/" + fbId, postData);
        return data;
    },
    removeCareHappyBirthday: async function(fbId) {
        let data = await this.request_api("/care/bot-happy-birthday/remove", { id: fbId });
        return data;
    },
    getLogsCareHappyBirthday: async function(config) {
        let data;
        if (config) {
            data = await this.request_api("/care/bot-happy-birthday/logs?sort_by=DESC&limit=2000&" + config);
            return data;
        } else {
            data = await this.request_api("/care/bot-happy-birthday/logs?sort_by=DESC&limit=2000");
            return data;
        }
    },
    getListCareHappyBirthday: async function() {
        let data = await this.request_api("/care/bot-happy-birthday");
        return data;
    },
    // ----------------------Care Trans Account // Trans Group -----------------------
    careTransGroup: async function(postData) {
        let data = await this.request_api("/care/groups/transaction", postData);
        return data;
    },
    careTransAccount: async function(postData) {
        let data = await this.request_api("/care/accounts/transaction", postData);
        return data;
    }
};
export default api;
