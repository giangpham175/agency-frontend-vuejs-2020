// import Vue from "vue";
import axios from "axios";
import store from "../store";
import router from "../router";
import { LOGOUT, APP_LOADING } from "../store/types";
import { API_URL } from "../config";
// import toastr from "toastr";
import { catchError } from "../helpers";
import Vue from "vue";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
    config => {
        store.commit(APP_LOADING, true);
        if (store.state.user.api_token) {
            config.headers.Authorization = `Bearer ${store.state.user.api_token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    async response => {
        store.commit(APP_LOADING, false);
        if (response && response.data && response.data.message) {
            await Vue.swal.fire("Thành công", response.data.message, "success");
            // toastr.success(response.data.message);
        }
        if (response && response.data && response.data.error) {
            if (catchError(response.data)) {
                await Vue.swal.fire("Lỗi", catchError(response.data), "error");
            }
        }
        return response && response.data ? response.data : response;
    },
    async error => {
        store.commit(APP_LOADING, false);
        if (error.response) {
            if (error.response.data) {
                console.log(catchError(error.response.data));
                if (catchError(error.response.data)) {
                    await Vue.swal.fire("Lỗi", catchError(error.response.data), "error");
                }
                // toastr.error(catchError(error.response.data));
            }
            switch (error.response.status) {
                case 401:
                    store.commit(LOGOUT);
                    router.currentRoute.path !== "login" &&
                        router.replace({
                            path: "login",
                            query: { redirect: router.currentRoute.path }
                        });
            }
        } else {
            Vue.swal.fire("Lỗi", "Kết nối với máy chủ thất bại!", "error");
            // toastr.error("Kết nối với máy chủ thất bại!");
        }
        return error.response && error.response.data ? error.response.data : error.response;
    }
);

export default axios;
