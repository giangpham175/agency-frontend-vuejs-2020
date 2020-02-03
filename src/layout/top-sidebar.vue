<template>
    <div>
        <header class="topbar">
            <nav class="navbar top-navbar navbar-expand-md navbar-dark">
                <!-- ============================================================== -->
                <!-- Logo -->
                <!-- ============================================================== -->
                <div class="navbar-header">
                    <router-link to="/" class="navbar-brand">
                        <b>
                            <img :src="logo" style="width:'40px'; height:40px" class="light-logo mr-1" />
                        </b>
                        <span v-show="!isMiniSidebar && !isMobile">
                            <span>{{ site.site_header }}</span>
                        </span>
                    </router-link>
                </div>
                <!-- ============================================================== -->
                <!-- End Logo -->
                <!-- ============================================================== -->
                <div class="navbar-collapse">
                    <!-- ============================================================== -->
                    <!-- toggle and nav items -->
                    <!-- ============================================================== -->
                    <ul class="navbar-nav mr-auto">
                        <!-- This is  -->
                        <li class="nav-item">
                            <a @click="sidebartoggler()" class="nav-link nav-toggler d-block d-md-none waves-effect waves-dark" href="javascript:void(0)">
                                <i :class="[{ 'ti-menu': !isMiniSidebar, 'ti-close': isMiniSidebar }]"></i>
                            </a>
                        </li>
                        <li v-if="!isMobile" class="nav-item">
                            <!-- <h6 class="ml-2 bold">Dịch vụ Like</h6> -->
                            <img src="/assets/images/logo.png" alt="" class="ml-4" />
                        </li>
                        <!-- ============================================================== -->
                        <!-- Search -->
                        <!-- ============================================================== -->
                        <!-- <li class="nav-item">
                            <form class="app-search d-none d-md-block d-lg-block">
                                <input type="text" class="form-control" placeholder="Search & enter" />
                            </form>
                        </li> -->
                    </ul>
                    <!-- ============================================================== -->
                    <!-- User profile and search -->
                    <!-- ============================================================== -->
                    <ul class="navbar-nav my-lg-0">
                        <!-- ============================================================== -->
                        <!-- Comment -->
                        <!-- ============================================================== -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="icon-bell"></i>
                                <div class="notify">
                                    <span class="heartbit"></span>
                                    <span class="point"></span>
                                </div>
                            </a>
                            <!-- <a class="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="ti-email"></i>
                                <div class="notify">
                                    <span class="heartbit"></span>
                                    <span class="point"></span>
                                </div>
                            </a> -->
                            <div class="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
                                <ul>
                                    <li>
                                        <div class="drop-title">Thông Báo</div>
                                    </li>
                                    <li>
                                        <div class="message-center">
                                            <!-- Message -->
                                            <a v-for="(noti, index) in notifies" :key="index" href="javascript:void(0)">
                                                <span :class="['round', 'round-' + noti.color]">
                                                    {{ noti.logo }}
                                                </span>
                                                <div class="mail-contnet">
                                                    <span class="text-dark">{{ noti.content }}</span>
                                                    <span class="time text-success">{{ noti.time }}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                    <li class="text-center pt-2">
                                        <router-link to="/">
                                            <strong class="">Xem tất cả thông báo</strong>
                                            <i class="fa fa-angle-right m-l-5"></i>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <!-- ============================================================== -->
                        <!-- End Comment -->
                        <!-- ============================================================== -->
                        <!-- ============================================================== -->
                        <!-- User Profile -->
                        <!-- ============================================================== -->
                        <li class="nav-item dropdown u-pro">
                            <a class="nav-link dropdown-toggle waves-effect waves-dark profile-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img :src="user.avatar_id ? 'https://graph.facebook.com/' + user.avatar_id + '/picture?width=100&height=100' : 'assets/images/users/avatar_fb.jpg'" alt="user" class="img-avatar" />
                                <span class="hidden-md-down data-user-name m-l-10">
                                    <i class="fa fa-angle-down"></i>
                                </span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right animated flipInY">
                                <!-- text-->
                                <router-link to="/profile" class="dropdown-item">
                                    <i class="ti-user"></i>
                                    Tài Khoản
                                </router-link>
                                <!-- text-->
                                <router-link to="/payment" class="dropdown-item">
                                    <i class="ti-wallet"></i>
                                    Thanh Toán
                                </router-link>
                                <!-- text-->
                                <div class="dropdown-divider"></div>
                                <!-- text-->
                                <router-link v-if="isAdmin" to="/site-config" class="dropdown-item">
                                    <i class="ti-settings"></i>
                                    Admin Setting
                                </router-link>
                                <!-- text-->
                                <div class="dropdown-divider"></div>
                                <!-- text-->
                                <a href="#" class="dropdown-item" @click="logout"> <i class="fa fa-power-off"></i> Thoát</a>
                                <!-- text-->
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
import api from "@/api";
import moment from "moment";
import { APP_IS_MIMI_SIDEBAR } from "@/store/types";
import { LOGOUT } from "@/store/types";
export default {
    name: "top-bar",
    data() {
        return {
            timer: "",
            notifies: []
        };
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        isMiniSidebar() {
            return this.$store.state.app.isMiniSidebar;
        },
        isMobile() {
            return this.$store.state.app.isMobile;
        },
        isDungQb() {
            return this.$store.state.isDungQb;
        },
        site() {
            return this.$store.state.user.site;
        },
        route() {
            return this.$route.name;
        },
        logo() {
            return "assets/images/logo-icon.png";
        },
        isAdmin() {
            return this.$store.state.isAdmin;
        }
    },
    watch: {
        route(nv, ov) {
            this.getNotify();
            if (ov === "Payment") {
                clearInterval(this.timer);
            }
            if (nv === "Payment") {
                let _this = this;
                this.timer = setInterval(function() {
                    _this.getNotify();
                }, 10000);
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        logout: async function() {
            this.$store.dispatch(LOGOUT);
        },
        sidebartoggler() {
            this.$store.commit(APP_IS_MIMI_SIDEBAR);
        },
        getNotify: async function() {
            let data = await api.getNotify();
            if (data.status === 200) {
                this.notifies = data.data.data.map(item => {
                    let colorArray = ["primary", "info", "danger", "warning", "success", "secondary"];
                    let ramdom = Math.floor(Math.random() * 5);
                    item.name = this.user ? this.user.name : "";
                    item.actions_html = item.actions ? item.actions.name : item.action;
                    item.time = moment(item.created_at).fromNow();
                    item.color = colorArray[ramdom];
                    item.logo = item.actions ? item.actions.name.split(" ")[0] : item.tool ? item.tool.name.charAt(0) : "S";
                    return item;
                });
            }
            this.notifies.forEach(noti => {
                if (noti.tool_id === 7 && noti.status === 1) {
                    this.$swal("Nạp tiền thành công", noti.content, "success");
                    api.updateNotify(noti.id);
                } else if (noti.type === "transaction_coin" && noti.status === 1) {
                    this.$swal("Thành Công", noti.content, "success");
                    api.updateNotify(noti.id);
                }
            });
        }
    },
    created() {
        moment.locale("vi");
        this.getNotify();
        if (this.route === "Payment") {
            let _this = this;
            this.timer = setInterval(function() {
                _this.getNotify();
            }, 10000);
        }
    }
};
</script>
