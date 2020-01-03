import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
import swal from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueToastr2 from "vue-toastr-2";
import "vue-toastr-2/dist/vue-toastr-2.min.css";
import VueNumber from "vue-number-animation";
import VueClipboard from "vue-clipboard2";
import { SITE, APP_IS_MOBILE, APP_IS_MIMI_SIDEBAR } from "./store/types";

Vue.use(VueClipboard);
Vue.use(VueNumber);
window.toastr = require("toastr");
Vue.use(swal);
Vue.use(VueToastr2);
moment.locale("vi");
Vue.config.productionTip = false;
Vue.filter("formatNumber", function(x) {
    return x
        ? Math.round(Number(x))
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : 0;
});
Vue.filter("timeAgo", function(x) {
    let time = moment(x).fromNow();
    return time.includes("Invalid") ? x : time;
});

new Vue({
    router,
    store,
    render: h => h(App),
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    data: {
        show: true,
        window: {
            width: 0,
            height: 0
        },
        oldSize: 0
    },
    async created() {
        await this.getSite();
        this.oldSize = window.innerWidth;
        window.addEventListener("resize", this.handleResize);
        if (window.innerWidth < 576) {
            this.$store.commit(APP_IS_MOBILE, true);
            document.body.classList.add("mini-sidebar");
        } else {
            this.$store.commit(APP_IS_MOBILE, false);
            document.body.classList.remove("mini-sidebar");
        }
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
            if (this.window.width < 576 && this.oldSize >= 576) {
                this.$store.commit(APP_IS_MOBILE, true);
                // this.$store.commit('handleSidebar');
                this.oldSize = this.window.width;
            }
            if (this.window.width > 576 && this.oldSize <= 576) {
                this.$store.commit(APP_IS_MOBILE, false);
                this.$store.commit(APP_IS_MIMI_SIDEBAR);
                // document.body.classList.remove("mini-sidebar");
                this.oldSize = this.window.width;
            }
        },
        getSite: async function() {
            let siteHost = document.location.host;
            console.log(siteHost);
            if (siteHost.match(/192.168.1.100|localhost/)) {
                siteHost = "dichvulike.info";
            }
            await this.$store.dispatch(SITE, siteHost);
        }
    }
}).$mount("#app");
