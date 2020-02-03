import Vue from "vue";
import Router from "vue-router";
import dashboardRouter from "./modules/dashboard";
import { loginRouter, registerRouter, fogetPasswordRouter } from "./modules/auth";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [dashboardRouter, loginRouter, registerRouter, fogetPasswordRouter, { path: "*", redirect: "/", hidden: true }]
});
