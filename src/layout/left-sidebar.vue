<template>
    <div>
        <aside class="left-sidebar">
            <vue-perfect-scrollbar class="scroll-sidebar">
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <!-- top -->
                        <div :class="[isMiniSidebar && !isMobile ? 'top-left-sidebar' : '', 'text-center']">
                            <router-link to="/home" class="homepage px-2">
                                <img src="/assets/images/logo.png" alt class="mt-3" />
                                <h3 class="bold yellow my-3">Dichvulike.com</h3>
                            </router-link>
                        </div>

                        <!-- mid -->
                        <li class="mb-3" v-show="((user.role == 'admin' || !menu.admin) && !menu.is_hidden) || isDev" v-for="(menu, index) in menus" :key="index" :class="menu.class">
                            <a @click="handleSidebarExpandClick(menu)" v-show="menu.childs" :class="[menu.open ? 'active' : '', isMiniSidebar && !isMobile ? 'mini-siderbar' : '', 'has-arrow waves-effect waves-dark']" href="javascript:void(0)" aria-expanded="false" class="pl-2">
                                <i :class="[menu.icon, menu.color ? menu.color : isMiniSidebar && !isMobile ? 'mini-siderbar' : 'text-white', menu.open ? 'active' : '']"></i>
                                <span class="hide-menu font-bold">{{ menu.text }}</span>
                            </a>

                            <ul aria-expanded="false" :class="['collapse', { in: menu.open }, isMiniSidebar && !isMobile ? 'mini-siderbar' : '', 'px-2']">
                                <li v-show="!child.is_hidden || isDev" v-for="(child, index2) in menu.childs" :key="index2">
                                    <div>
                                        <router-link :to="child.to">
                                            <!-- <i v-if="child.isMaintenance" class="fa fa-warning text-danger mr-1"></i>
                      <i v-if="child.is_hidden" class="fa fa-lock text-danger mr-1"></i>-->
                                            <!-- <i v-if="child.open" class="fas fa-angle-double-right mt-2 ml-2" style></i> -->
                                            <div class="child2-menu row align-items-center">
                                                <div class="col-1">
                                                    <h6 class="child orange">
                                                        <i class="fas fa-angle-double-right mt-2" style></i>
                                                    </h6>
                                                </div>
                                                <div class="col">
                                                    <span :class="child.isMaintenance ? 'text-warning font-bold' : child.is_hidden ? 'text-danger font-bold' : 'font-bold'">{{ child.notes ? child.notes.replace("- Pro", "") : child.text }}</span>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </li>
                            </ul>
                        </li>

                        <!-- info user -->
                        <div class="card card-user mx-2 mt-auto">
                            <div class="card-body py-3">
                                <div :class="[isMiniSidebar && !isMobile ? 'top-left-sidebar' : '', '']">
                                    <h6 class="text-center">
                                        <img :src="user.avatar_id ? 'https://graph.facebook.com/' + user.avatar_id + '/picture?width=100&height=100' : 'assets/images/users/avatar_fb.jpg'" alt="user-img" width="50" class="img-circle" />
                                    </h6>
                                    <h6 class="text-center hide-menu m-0">{{ user.name ? user.name : user.username }}</h6>
                                    <h4 class="hide-menu font-bold">
                                        <span v-if="user.role != 'user'" :class="['badge d-block user-level', 'badge-' + badge_color]">{{ user.role }}</span>
                                        <span v-else-if="user.levels[0]" :class="['badge d-block user-level', 'badge-' + badge_color]">{{ user.levels[0].name }}</span>
                                    </h4>
                                    <h5 class="text-center hide-menu bold">{{ user.coin | formatNumber }} VND</h5>
                                </div>
                            </div>

                            <div class="mx-3 text-center" style="border:1px solid blue;"></div>

                            <div class="card-body py-3">
                                <router-link to="/profile" tag="a" class="waves-effect waves-dark px-4 py-2">
                                    <i class="far fa-user blue mx-2"></i>
                                    <span class="hide-menu font-bold blue">Tài khoản</span>
                                </router-link>

                                <router-link to="/profile" tag="a" class="waves-effect waves-dark px-4 py-2">
                                    <i class="fas fa-wallet blue mx-2"></i>
                                    <span class="hide-menu font-bold blue">Nạp tiền</span>
                                </router-link>

                                <router-link to="/profile" tag="a" class="waves-effect waves-dark px-4 py-2">
                                    <i class="far fa-bell blue mx-2"></i>
                                    <span class="hide-menu font-bold blue">Thông báo</span>
                                </router-link>

                                <a @click="logout" class="waves-effect waves-dark px-4 py-2" href="#" aria-expanded="false">
                                    <i class="fas fa-sign-out-alt blue mx-2"></i>
                                    <span class="hide-menu font-bold blue">Thoát</span>
                                </a>
                            </div>
                        </div>
                    </ul>
                </nav>
            </vue-perfect-scrollbar>
        </aside>
    </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import menus from "@/config/menu";
import { mapGetters } from "vuex";
import { APP_IS_MIMI_SIDEBAR } from "@/store/types";
export default {
    name: "left-sidebar",
    components: {
        VuePerfectScrollbar
    },
    data() {
        return {
            menus: [],
            isOpenMenuAvatar: false
        };
    },
    computed: {
        isMiniSidebar() {
            return this.$store.state.app.isMiniSidebar;
        },
        isMobile() {
            return this.$store.state.app.isMobile;
        },
        user() {
            return this.$store.state.user.user;
        },
        isDungQb() {
            return this.$store.state.isDungQb;
        },
        isDev() {
            return this.$store.state.isDev;
        },
        ...mapGetters(["tools"]),
        site() {
            return this.$store.state.user.site;
        },
        reload() {
            return this.$store.state.reload;
        },
        badge_color() {
            let color = "";
            let skin = "yellow";
            let arr = [
                { skin: "default", color: "dark" },
                { skin: "megna", color: "cyan" },
                { skin: "green", color: "success" },
                { skin: "red", color: "danger" },
                { skin: "purple", color: "secondary" },
                { skin: "yellow", color: "yellow" }
            ];
            arr.forEach(item => {
                if (skin.includes(item.skin)) {
                    color = item.color;
                }
            });
            return color || "info";
        }
    },
    watch: {
        tools() {
            this.menuConfig();
        },
        user() {
            this.menuConfig();
        }
    },
    mounted() {
        this.menus = menus;
        this.menus.forEach(menu => {
            this.$set(menu, "open", false);
        });
        this.menuConfig();
    },
    methods: {
        sidebartoggler() {
            this.$store.commit(APP_IS_MIMI_SIDEBAR);
        },
        logout: async function() {
            this.$store.dispatch("logout");
        },
        handleSidebarExpandClick(menu) {
            menu.open = !menu.open;
        },
        openMenuAvatar() {
            this.isOpenMenuAvatar = !this.isOpenMenuAvatar;
        },
        menuFormat: function(menu) {
            menu.childs = menu.childs.map(child => {
                if (child.name) {
                    let discount = menu.discount ? menu.discount : 0;
                    let price = 0;
                    let toolName = child.tool_alias;
                    let currentTool = this.tools.tools.find(item => {
                        return item.tool_alias === toolName || item.package_name === toolName;
                    });
                    if (!currentTool) {
                        for (const item of this.tools.tools) {
                            if (item.prices) {
                                for (const price of item.prices) {
                                    if (price.package_name === toolName) {
                                        currentTool = price;
                                    }
                                }
                            }
                        }
                    }
                    if (currentTool) {
                        child.hide = false;
                        child.isMaintenance = false;
                        if (currentTool.status === -1) {
                            child.hide = true;
                        }
                        if (currentTool.status === 0) {
                            child.isMaintenance = true;
                        }
                        price = currentTool.prices && currentTool.prices[0] ? currentTool.prices[0].price : currentTool.price ? currentTool.price : currentTool.prices;
                        price = price * (1 - discount / 100);
                        child.notes = child.notes ? child.notes : currentTool.notes;
                        if (toolName === "vip_seeding_like_clone") {
                            child.price = price * 30 + " đ";
                        } else child.price = price.toLocaleString("it-IT") + " đ";
                    }
                }
                return child;
            });
        },
        menuConfig: function() {
            this.menus = this.menus.map(menu => {
                let discount = this.user && this.user.levels ? this.user.levels[0].discount : 0;
                menu.discount = discount;
                if (menu.childs) {
                    this.menuFormat(menu);
                    menu.childs.forEach(child0 => {
                        if (child0.childs) {
                            child0.childs.discount = discount;
                            this.menuFormat(child0);
                        }
                    });
                }
                if (menu.name) {
                    let price = 0;
                    let toolName = menu.name;
                    let currentTool = this.tools.tools.find(item => {
                        return item.name === toolName;
                    });
                    if (currentTool) {
                        menu.hide = false;
                        menu.isMaintenance = false;
                        if (currentTool.status === -1) {
                            menu.hide = true;
                        }
                        if (currentTool.status === 0) {
                            menu.isMaintenance = true;
                        }
                        menu.notes = currentTool.notes;
                        menu.count = price.toLocaleString("it-IT") + " đ";
                    }
                }
                return menu;
            });
        }
    }
};
</script>
<style scoped>
.user-level {
    border-radius: 0;
}
.badge-secondary {
    color: #ffffff;
    background-color: #6f42c1;
}
.badge-dark {
    color: #ffffff;
    background-color: #4f5467;
}
.color-facebook {
    color: #4267b2 !important;
}
.top-left-sidebar {
    margin-left: 10px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
}
</style>
