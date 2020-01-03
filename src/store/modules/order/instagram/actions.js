import { createOrder } from "../../../../api/services/instagram";
import { getInfo } from "../../../../api/user";
import * as types from "../../../types";

export default {
    async [types.INSTAGRAM_ORDER]({ commit }, payload) {
        try {
            const data = await createOrder(payload.params);
            const userInfo = await getInfo();
            commit(types.STORE_SET_USER, userInfo.data);
            return data;
        } catch (e) {
            throw e;
        }
    }
};
