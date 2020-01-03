<template>
    <div>
        <aside class="left-sidebar">
            <vue-perfect-scrollbar class="scroll-sidebar">
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li :class="[isMiniSidebar && !isMobile ? 'top-left-sidebar' : '', '']">
                            <h4 @click="sidebartoggler()" :class="[isMiniSidebar ? ' text-center' : 'ml-3', 'mt-3 mb-5 text-white']">
                                <i v-if="isMiniSidebar && !isMobile" class="fas fa-align-left"></i>
                                <i v-else-if="!isMiniSidebar && !isMobile" class="fas fa-angle-double-left"></i>
                                <i v-else :class="[{ 'ti-menu': !isMobile, 'ti-close': isMobile }]"></i>
                            </h4>
                            <h6 class="text-center">
                                <img :src="user.avatar_id ? 'https://graph.facebook.com/' + user.avatar_id + '/picture?width=100&height=100' : 'assets/images/users/avatar_fb.jpg'" alt="user-img" width="50" class="img-circle" />
                            </h6>
                            <h6 class="text-center hide-menu">{{ user.name ? user.name : user.username }}</h6>
                            <h4 class="hide-menu font-bold">
                                <span v-if="user.role != 'user'" :class="['badge d-block user-level', 'badge-' + badge_color]">{{ user.role }}</span>
                                <span v-else-if="user.levels[0]" :class="['badge d-block user-level', 'badge-' + badge_color]">{{ user.levels[0].name }}</span>
                            </h4>
                            <h5 class="text-center hide-menu bold mb-5">
                                {{ user.coin | formatNumber }}
                            </h5>
                        </li>
                        <li class="mt-3" v-show="((user.role == 'admin' || !menu.admin) && !menu.is_hidden) || isDev" v-for="(menu, index) in menus" :key="index" :class="menu.class">
                            <!-- {{ menu.caption ? menu.caption : "" }}
                            <router-link v-if="menu.to" :to="menu.to" class="waves-effect waves-dark" aria-expanded="false">
                                <i :class="[menu.icon, menu.color ? menu.color : '']"></i>
                                <span class="hide-menu font-bold">
                                    <i v-if="menu.isMaintenance" class="fa fa-warning text-danger mr-1"></i>
                                    <i v-if="menu.hide" class="fa fa-lock text-danger mr-1"></i>
                                    <span :class="menu.isMaintenance ? 'text-warning' : menu.hide ? 'text-danger' : ''">{{ menu.notes ? menu.notes.replace("- Pro", "") : menu.text }}</span>
                                    <span v-if="menu.notes && menu.notes.indexOf('Pro') > -1" class="badge badge-success text-white ml-auto m-r-5">Pro</span>
                                    <span v-if="menu.show_coin" class="badge badge-pill badge-cyan text-white ml-auto" page="home">{{ user.coin | formatNumber }}</span>
                                </span>
                            </router-link> -->
                            <a @click="handleSidebarExpandClick(menu)" v-show="menu.childs" :class="[menu.open ? 'active' : '', isMiniSidebar && !isMobile ? 'mini-siderbar' : '', 'has-arrow waves-effect waves-dark']" href="javascript:void(0)" aria-expanded="false">
                                <i :class="[menu.icon, menu.color ? menu.color : isMiniSidebar && !isMobile ? 'mini-siderbar' : 'text-white', menu.open ? 'active' : '']"></i>
                                <span class="hide-menu font-bold">{{ menu.text }}</span>
                            </a>
                            <ul aria-expanded="false" :class="['collapse', { in: menu.open }, isMiniSidebar && !isMobile ? 'mini-siderbar' : '']">
                                <li v-show="!child.is_hidden || isDev" v-for="(child, index2) in menu.childs" :key="index2">
                                    <router-link :to="child.to">
                                        <!-- <i :class="['mr-2', child.icon]"></i> -->
                                        <i v-if="child.isMaintenance" class="fa fa-warning text-danger mr-1"></i>
                                        <i v-if="child.is_hidden" class="fa fa-lock text-danger mr-1"></i>
                                        <span :class="child.isMaintenance ? 'text-warning font-bold' : child.is_hidden ? 'text-danger font-bold' : 'font-bold'">{{ child.notes ? child.notes.replace("- Pro", "") : child.text }} </span>
                                        <span v-if="child.notes && child.notes.indexOf('Pro') > -1" class="badge badge-success text-white ml-auto m-r-5">Pro</span>
                                        <span v-if="child.badge" class="badge badge-danger text-white ml-auto" page="home">{{ child.count }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-small-cap">--- HỖ TRỢ</li>
                        <li>
                            <a class="waves-effect waves-dark" :href="site.config && site.config.guide ? site.config.guide : null" target="_blank" aria-expanded="false">
                                <i class="fa fa-circle-o text-danger"></i>
                                <span class="hide-menu">Hướng Dẫn</span>
                            </a>
                        </li>
                        <li>
                            <a class="waves-effect waves-dark" href="#" aria-expanded="false">
                                <i class="fa fa-circle-o text-info"></i>
                                <span class="hide-menu">Hỏi Đáp</span>
                            </a>
                        </li>
                        <li>
                            <a @click="logout" class="waves-effect waves-dark" href="#" aria-expanded="false">
                                <i class="fa fa-circle-o text-success"></i>
                                <span class="hide-menu">Thoát</span>
                            </a>
                        </li>
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
