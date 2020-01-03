import { createOrder } from "../../../../api/services/facebook";
import { getInfo } from "../../../../api/user";
import * as types from "../../../types";

export default {
    async [types.FACEBOOK_ORDER]({ commit }, payload) {
        try {
            const data = await createOrder(payload.params);
            const meUser = await getInfo();
            commit(types.STORE_SET_USER, meUser.data);
            return data;
        } catch (e) {
            throw e;
        }
    }
};
