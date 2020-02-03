import api from "./index";

export default {
    transferCoin: async function(toUser, quantity) {
        let data = await api.request_api("/users/coin/transaction", {
            to_user: toUser,
            quantity
        });
        return data;
    },
    getStatistics: async function(dateFrom, dateTo) {
        let data = await api.request_api("/statistics?date_from=" + dateFrom + "&date_to=" + dateTo);
        return data;
    }
};