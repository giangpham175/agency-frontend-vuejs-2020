import actions from "./actions";
import * as types from "../../types";

const user = {
    state: {
        user: {},
        api_token: "",
        site: ""
    },

    mutations: {
        [types.STORE_SET_TOKEN]: (state, api_token) => {
            Object.assign(state, { api_token });
        },
        [types.STORE_SET_USER]: (state, user) => {
            Object.assign(state, { user });
        },
        [types.STORE_SET_SITE_ID]: (state, site) => {
            Object.assign(state, { site });
        }
    },

    actions
};

export default user;
