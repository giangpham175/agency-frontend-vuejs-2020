import { getTools } from "@/api/tool";
import * as types from "../../types";

export default {
    async [types.GET_TOOLS]({ commit }) {
        try {
            const data = await getTools();
            commit(types.STORE_SET_LIST_TOOLS, data.data);
            return data;
        } catch (e) {
            throw e;
        }
    }
};
