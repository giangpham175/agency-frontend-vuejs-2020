<template>
    <div>
        <div class="row">
            <div class="col-md-6 col-12">
                <div v-for="(item, index) in menus" :key="index">
                    <h3 :class="['bold', item.color]">{{ item.name }}</h3>
                    <div class="row text-center align-items-center">
                        <div class="col-3" v-for="(child, indexs) in item.childs" :key="indexs">
                            <div class="card height-130">
                                <div class="card-body p-2 py-3">
                                    <router-link :to="child.to" class="router" aria-expanded="false">
                                        <img :src="'/assets/images/' + child.img" alt class="mb-3" />
                                        <h6 class="font-bold font-13 m-0">{{ child.text }}</h6>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- admin -->
            <div v-if="user.role == 'admin'" class="col-md-6 col-12">
                <!-- notify -->
                <h3 class="bold blue">THÔNG BÁO</h3>
                <div class="card card-info">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-8 text-justify">
                                <h3 class="font-23">Để Thanh Toán Các Bạn Chọn Menu Thanh Toán. Quý Khách Hàng Thanh Toán Bao Nhiêu Thì Sử Dụng Bấy Nhiêu Trong Số Tổng Dịch Vụ 360 Cung Cấp.</h3>
                            </div>
                            <div class="col-4">
                                <img src="/assets/images/home/notify.png" alt />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- report -->
                <h3 class="bold blue">BÁO CÁO</h3>
                <div class="row">
                    <div class="col-4">
                        <div class="card card-contact">
                            <div class="card-body text-center px-1">
                                <h4 class="font-19">TỔNG TIỀN</h4>
                                <h4 class="bold green font-22">
                                    <number ref="number1" :from="0" :to="user.coin" :format="theFormat" :duration="1" :delay="0" easing="Power1.easeOut" />
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card card-month">
                            <div class="card-body text-center px-1">
                                <h4 class="font-19">THÁNG NÀY</h4>
                                <h4 class="bold green font-22">
                                    <number ref="number1" :from="0" :to="user.total_recharge" :format="theFormat" :duration="1" :delay="0" easing="Power1.easeOut" />
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card card-info">
                            <div class="card-body text-center px-1">
                                <h4 class="font-19">TỔNG NẠP</h4>
                                <h4 class="bold green font-22">
                                    <number ref="number1" :from="0" :to="totalDayUse" :format="theFormat" :duration="1" :delay="0" easing="Power1.easeOut" />
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- choose-time -->
                <div class="col-11 ml-auto text-center p-0">
                    <div class="card card-gray">
                        <div class="card-body py-0 px-1">
                            <div class="row justify-content-around">
                                <div class="col-md-1 col-6 my-2 px-0">
                                    <h6 class="font-bold mb-0">
                                        <i class="fas fa-calendar-alt"></i>
                                    </h6>
                                </div>
                                <div class="col-md-4 col-6 my-2 px-0">
                                    <div class="vdatetime theme-green">
                                        <input id type="text" class="vdatetime-input text-center input-light" />
                                        <!---->
                                        <div></div>
                                    </div>
                                </div>
                                <div class="col-md-1 col-6 my-2 px-0">
                                    <h6 class="font-bold mb-0">đến</h6>
                                </div>
                                <div class="col-md-4 col-6 my-2 px-0">
                                    <div class="vdatetime theme-green">
                                        <input id type="text" class="vdatetime-input text-center input-light" />
                                        <!---->
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- chart -->
                <div class="chart">
                    <!-- <div class="row justify-content-end">
            <div class="col-1" style="width:20px;height:20px;background:#352D7D"></div>
            <p class="col-2">Tiền tiêu</p>
            <div class="col-1" style="width:20px;height:20px;background:#FFB900"></div>
            <p class="col-2">Tiền nạp</p>
          </div>-->
                    <BarChart />
                </div>

                <!-- contact -->
                <h3 class="bold blue">HỖ TRỢ</h3>
                <div class="card card-contact">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-7">
                                <h3 class="bold">LIÊN HỆ HỖ TRỢ</h3>
                                <div class="my-3" style="border:1px solid white;"></div>
                                <div class="row p-2">
                                    <img src="/assets/images/home/fbContact.png" alt />
                                    <a href="https://www.facebook.com/DichVuLike" target="_blank">
                                        <h4 class="font-15 font-bold white pl-2 m-0 mt-2">FB.COM/DICHVULIKE</h4>
                                    </a>
                                </div>
                                <div class="row p-2">
                                    <img src="/assets/images/home/phoneContact.png" alt />
                                    <a href="tel:+84321445522">
                                        <h4 class="font-15 font-bold white pl-2 m-0 mt-2">0321.44.55.22</h4>
                                    </a>
                                </div>
                            </div>
                            <div class="col-5 p-0">
                                <img src="/assets/images/home/contact.png" alt class="w-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- user -->
            <div v-else class="col-md-6 col-12">
                <!-- notify -->
                <h3 class="bold blue">THÔNG BÁO</h3>
                <div class="card card-info">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-8 text-justify">
                                <h3 class="font-23">Để Thanh Toán Các Bạn Chọn Menu Thanh Toán. Quý Khách Hàng Thanh Toán Bao Nhiêu Thì Sử Dụng Bấy Nhiêu Trong Số Tổng Dịch Vụ 360 Cung Cấp.</h3>
                            </div>
                            <div class="col-4">
                                <img src="/assets/images/home/notify.png" alt />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- report -->
                <h3 class="bold blue">BÁO CÁO</h3>
                <div class="row">
                    <div class="col-4">
                        <div class="card card-contact">
                            <div class="card-body text-center px-1">
                                <h4 class="font-19">TỔNG TIỀN</h4>
                                <h4 class="bold green font-22">
                                    <number ref="number1" :from="0" :to="user.coin" :format="theFormat" :duration="1" :delay="0" easing="Power1.easeOut" />
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card card-month">
                            <div class="card-body text-center px-1">
                                <h4 class="font-19">THÁNG NÀY</h4>
                                <h4 class="bold green font-22">
                                    <number ref="number1" :from="0" :to="user.total_recharge" :format="theFormat" :duration="1" :delay="0" easing="Power1.easeOut" />
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card card-info">
                            <div class="card-body text-center px-1">
                                <h4 class="font-19">TỔNG NẠP</h4>
                                <h4 class="bold green font-22">
                                    <number ref="number1" :from="0" :to="totalDayUse" :format="theFormat" :duration="1" :delay="0" easing="Power1.easeOut" />
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- choose-time -->
                <div class="col-11 ml-auto text-center p-0">
                    <div class="card card-gray">
                        <div class="card-body py-0 px-1">
                            <div class="row justify-content-around">
                                <div class="col-md-1 col-6 my-2 px-0">
                                    <h6 class="font-bold mb-0">
                                        <i class="fas fa-calendar-alt"></i>
                                    </h6>
                                </div>
                                <div class="col-md-4 col-6 my-2 px-0">
                                    <div class="vdatetime theme-green">
                                        <input id type="text" class="vdatetime-input text-center input-light" />
                                        <!---->
                                        <div></div>
                                    </div>
                                </div>
                                <div class="col-md-1 col-6 my-2 px-0">
                                    <h6 class="font-bold mb-0">đến</h6>
                                </div>
                                <div class="col-md-4 col-6 my-2 px-0">
                                    <div class="vdatetime theme-green">
                                        <input id type="text" class="vdatetime-input text-center input-light" />
                                        <!---->
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- chart -->
                <div class="chart">
                    <div class="row justify-content-end">
                        <div class="col-1" style="width:20px;height:20px;background:#352D7D"></div>
                        <p class="col-2">Tiền tiêu</p>
                        <div class="col-1" style="width:20px;height:20px;background:#FFB900"></div>
                        <p class="col-2">Tiền nạp</p>
                    </div>
                    <h1 class="bold text-center">CHART</h1>
                </div>

                <!-- contact -->
                <h3 class="bold blue">HỖ TRỢ</h3>
                <div class="card card-contact">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-7">
                                <h3 class="bold">LIÊN HỆ HỖ TRỢ</h3>
                                <div class="my-3" style="border:1px solid white;"></div>
                                <div class="row p-2">
                                    <img src="/assets/images/home/fbContact.png" alt />
                                    <a href="https://www.facebook.com/DichVuLike" target="_blank">
                                        <h4 class="font-15 font-bold white pl-2 m-0 mt-2">FB.COM/DICHVULIKE</h4>
                                    </a>
                                </div>
                                <div class="row p-2">
                                    <img src="/assets/images/home/phoneContact.png" alt />
                                    <a href>
                                        <h4 class="font-15 font-bold white pl-2 m-0 mt-2">0321.44.55.22</h4>
                                    </a>
                                </div>
                            </div>
                            <div class="col-5 p-0">
                                <img src="/assets/images/home/contact.png" alt class="w-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import menus from "@/config/menu";
import { removeUnicode } from "../../helpers";
import moment from "moment";

import BarChart from "@/components/BarChart.vue";

export default {
    name: "home",
    components: {
        BarChart
    },
    data() {
        return {
            menu_list: [],
            menu_filter: [],
            is_read: false,
            menu_search: "",
            isSearch: false,
            menus: menus,
            title_noti: "",
            notes_noti: "",
            //
            chartData: {}
        };
    },
    created() {
        for (const menu of this.menus) {
            menu.show = false;
            menu.show_left = false;
        }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        totalDayUse() {
            return moment().diff(this.user.created_at, "days");
        },
        site() {
            return this.$store.state.user.site;
        },
        payment_syntax() {
            let config = JSON.parse(this.site.config);
            if (config.payment_syntax) {
                let syntax = config.payment_syntax;
                let username = this.user.username;
                return syntax.replace("{username}", username);
            } else return null;
        },
        payment_note() {
            let config = JSON.parse(this.site.config);
            if (config.payment_note) {
                let note = config.payment_note;
                return note.replace(/\n/g, "<br>");
            } else return null;
        },
        paymentInfo() {
            return JSON.parse(this.site.payment);
        }
    },
    watch: {
        menu_search(value) {
            let search = removeUnicode(value).toLowerCase();
            this.menu_filter = this.menu_list.filter(item => {
                if (
                    removeUnicode(item.header)
                        .toLowerCase()
                        .includes(search) ||
                    removeUnicode(item.type)
                        .toLowerCase()
                        .includes(search)
                ) {
                    return item;
                }
            });
        }
    },
    methods: {
        async showMenu(item) {
            this.menus = this.menus.map(menu => {
                if (item === menu) {
                    menu.show = !menu.show;
                } else menu.show = false;
                return menu;
            });
        },
        theFormat(number) {
            return number
                ? Math.round(Number(number))
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : 0;
        }
    }
};
</script>
