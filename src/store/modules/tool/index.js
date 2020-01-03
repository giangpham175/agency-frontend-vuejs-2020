import actions from "./actions";
import * as types from "../../types";

const tools = {
    state: {
        tools: []
    },
    mutations: {
        [types.STORE_SET_LIST_TOOLS]: (state, tools) => {
            state.tools = tools;
        }
    },

    actions
};

export default tools;
