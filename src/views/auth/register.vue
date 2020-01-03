<template>
    <section id="wrapper">
        <div class="login-register">
            <div class="login-box card card-gray">
                <div class="card-body">
                    <form v-on:submit="registerWithUsername" v-show="showFormLogin" class="form-horizontal form-material" id="loginform" action="javascript:void(0);">
                        <h3 class="box-title m-b-20">Đăng Ký</h3>
                        <div class="form-group mt-4">
                            <div class="col-xs-12">
                                <input class="form-control input-box" type="text" required="" placeholder="Tên tài khoản" v-model="username" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input class="form-control input-box" type="text" required="" placeholder="Địa chỉ Email" v-model="email" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input class="form-control input-box" type="password" required="" placeholder="Nhập mật khẩu" v-model="password" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input class="form-control input-box" type="password" required="" placeholder="Nhập lại mật khẩu" v-model="password_confirm" />
                            </div>
                        </div>
                        <div class="form-group text-center">
                            <div class="col-xs-12 p-b-20">
                                <button :disabled="loading" :class="['btn btn-block btn-lg btn-info btn-orange bold', loading ? 'loading' : null]" type="submit">
                                    Đăng Ký
                                </button>
                            </div>
                        </div>
                        <div class="form-group m-b-0">
                            <div class="col-sm-12 text-center">
                                Đã có tài khoản? <router-link to="/login" class="text-info m-l-5"><b>Đăng nhập</b></router-link>
                            </div>
                        </div>
                    </form>
                    <form v-show="!showFormLogin" class="form-horizontal" id="recoverform">
                        <div class="form-group ">
                            <div class="col-xs-12">
                                <h3>Quên Mật Khẩu</h3>
                                <p class="text-muted">Nhập email đã đăng ký của bạn để nhận mail reset mật khẩu</p>
                            </div>
                        </div>
                        <div class="form-group ">
                            <div class="col-xs-12">
                                <input class="form-control" type="text" required="" placeholder="Email" />
                            </div>
                        </div>
                        <div class="form-group text-center m-t-20">
                            <div class="col-xs-12">
                                <button class="btn btn-primary btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { register } from "@/api/auth";
export default {
    name: "Login",
    data() {
        return {
            username: "mrdark1188",
            password: "qqqqqq",
            showFormLogin: true,
            email: "111@gmail.com",
            password_confirm: "qqqqqq"
        };
    },
    computed: {
        site() {
            return this.$store.state.user.site;
        },
        loading() {
            return this.$store.state.loading;
        }
    },
    methods: {
        validEmail: function(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        registerWithUsername: async function() {
            if (!this.validEmail(this.email)) {
                this.$toastr.error("Vui lòng nhập chính xác email của bạn");
                return;
            }
            if (this.username.length < 1 || this.password.length < 1) {
                this.$toastr.error("Vui lòng nhập đầy đủ tài khoản và mật khẩu để đăng ký tài khoản");
                return;
            }
            if (this.password != this.password_confirm) {
                this.$toastr.error("Mật khẩu và mật khẩu xác nhận không giống nhau. Vui lòng thử lại");
                return;
            }
            let params = {
                username: this.username,
                password: this.password,
                user_id: this.site.user_id,
                site_id: this.site.id
            };
            let data = await register(params);
            if (data.success) {
                this.$router.push("login");
            }
        }
    }
};
</script>

<style>
.login-register {
    background-image: url(/assets/images/background/login.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 100vh;
    width: 100%;
    padding: 10% 0;
    position: fixed;
}

.login-box {
    width: 400px;
    margin: 0 auto;
}
.login-box .footer {
    width: 100%;
    left: 0px;
    right: 0px;
}
.login-box .social {
    display: block;
    margin-bottom: 30px;
}

#recoverform {
    display: none;
}

.login-sidebar {
    padding: 0px;
    margin-top: 0px;
}
.login-sidebar .login-box {
    right: 0px;
    position: absolute;
    height: 100%;
}

/*-- ==============================================================
    Phone and below ipad(767px)
    ============================================================== */
@media (max-width: 767px) {
    .container-fluid {
        padding: 0px 15px 0px 15px;
        overflow: hidden;
    }
    /*Header*/
    .topbar {
        width: 100%;
    }
    .topbar .top-navbar {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        -webkit-align-items: center;
    }
    .topbar .top-navbar .navbar-collapse {
        display: flex;
        width: 100%;
    }
    .topbar .top-navbar .navbar-nav {
        flex-direction: row;
    }
    .topbar .top-navbar .navbar-nav > .nav-item.show {
        position: static;
    }
    .topbar .top-navbar .navbar-nav > .nav-item.show .dropdown-menu {
        width: 100%;
        margin-top: 0px;
    }
    .topbar .top-navbar .navbar-nav .dropdown-menu {
        position: absolute;
    }
    .mega-dropdown .dropdown-menu {
        height: 480px;
        overflow: auto;
    }
    .comment-text .comment-footer .action-icons {
        display: block;
        padding: 10px 0;
    }
    .vtabs .tabs-vertical {
        width: auto;
    }
    /*Footer*/
    .material-icon-list-demo .icons div {
        width: 100%;
    }
    .error-page .footer {
        position: fixed;
        bottom: 0px;
        z-index: 10;
    }
    .error-box {
        position: relative;
        padding-bottom: 60px;
    }
    .error-body {
        padding-top: 10%;
    }
    .error-body h1 {
        font-size: 100px;
        font-weight: 600;
        line-height: 100px;
    }
    .login-register {
        position: relative;
        overflow: hidden;
    }
    .login-box {
        width: 90%;
    }
    .login-sidebar {
        padding: 10% 0;
    }
    .login-sidebar .login-box {
        position: relative;
    }
    /*This is for chat page*/
    .chat-main-box .chat-left-aside {
        left: -250px;
        position: absolute;
        transition: 0.5s ease-in;
        background: #fff;
    }
    .chat-main-box .chat-left-aside.open-pnl {
        left: 0px;
    }
    .chat-main-box .chat-left-aside .open-panel {
        display: block;
    }
    .chat-main-box .chat-right-aside {
        width: 100%;
    }
    /*Timeline*/
    ul.timeline:before {
        left: 40px;
    }
    ul.timeline > li > .timeline-panel {
        width: calc(100% - 70px);
    }
    ul.timeline > li > .timeline-badge {
        top: 16px;
        left: 15px;
        margin-left: 0;
    }
    ul.timeline > li > .timeline-panel {
        float: right;
    }
    ul.timeline > li > .timeline-panel:before {
        right: auto;
        left: -15px;
        border-right-width: 15px;
        border-left-width: 0;
    }
    ul.timeline > li > .timeline-panel:after {
        right: auto;
        left: -14px;
        border-right-width: 14px;
        border-left-width: 0;
    }
    /*Contact app page*/
    .left-aside {
        width: 100%;
        position: relative;
        border: 0px;
    }
    .right-aside {
        margin-left: 0px;
    }
    .flex-wrap {
        flex-wrap: wrap !important;
        -webkit-flex-wrap: wrap !important;
    }
    .chat-list li .chat-content {
        width: calc(100% - 80px);
    }
    /*Calendar*/
    .fc-toolbar .fc-left,
    .fc-toolbar .fc-right,
    .fc-toolbar .fc-center {
        float: none;
        display: block;
        text-align: center;
        margin-top: 10px;
        overflow: hidden;
    }
    .hidden-md-down {
        display: none;
    }
}
</style>
