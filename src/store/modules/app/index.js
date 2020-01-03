import * as types from "../../types";

const user = {
    app: {
        isLoading: false,
        isMobile: false,
        isMiniSidebar: false
    },

    mutations: {
        [types.APP_LOADING]: (state, isLoading) => {
            Object.assign(state, { isLoading });
        },
        [types.APP_IS_MOBILE]: (state, isMobile) => {
            Object.assign(state, { isMobile });
        },
        [types.APP_IS_MIMI_SIDEBAR]: (state, isMiniSidebar) => {
            isMiniSidebar = !state.isMiniSidebar;
            Object.assign(state, { isMiniSidebar });
        }
    }
};

export default user;
