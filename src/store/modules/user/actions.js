import { login } from "../../../api/auth";
import { getInfo } from "../../../api/user";
import { getSiteConfig } from "../../../api/site-config";
import * as types from "../../types";
import router from "@/router";
import { GET_TOOLS, USER_GET_INFO } from "@/store/types";
import store from "@/store";
export default {
    async [types.SITE]({ commit }, payload) {
        try {
            commit(types.APP_LOADING, true);
            const data = await getSiteConfig(payload);
            commit(types.APP_LOADING, false);
            commit(types.STORE_SET_SITE_ID, data.site);
            return data;
        } catch (e) {
            throw e;
        }
    },
    async [types.LOGIN]({ commit }, payload) {
        try {
            commit(types.APP_LOADING, true);
            const data = await login(payload.params);
            commit(types.APP_LOADING, false);
            if (data.success) {
                commit(types.STORE_SET_TOKEN, data.data.token);
                commit(types.STORE_SET_USER, data.data.data);
                store.dispatch(GET_TOOLS);
                store.dispatch(USER_GET_INFO);
                payload.notify.success("Đăng nhập thành công!");
            }
            router.push("/");
            return data;
        } catch (e) {
            throw e;
        }
    },
    [types.LOGOUT]({ commit }) {
        commit(types.STORE_SET_TOKEN, "");
        commit(types.STORE_SET_USER, {});
        router.push("/login");
    },
    async [types.USER_GET_INFO]({ commit }) {
        try {
            const data = await getInfo();
            if (data.data) {
                commit(types.STORE_SET_USER, data.data);
            }
            return data;
        } catch (e) {
            throw e;
        }
    }
};
