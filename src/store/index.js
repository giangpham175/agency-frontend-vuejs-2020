import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
//modules
import app from "./modules/app";
import user from "./modules/user";
import tool from "./modules/tool";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        user,
        tool
    },
    getters,
    plugins: [createPersistedState()]
});
