<template>
  <div>
    <div class="row">
      <div class="col-md-9 col-12">
        <div class="card card-info">
          <div class="card-body">
            <h4 class="bold">THÔNG BÁO</h4>
            <h6>Để Thanh Toán Các Bạn Chọn Menu Thanh Toán. Quý Khách Hàng Thanh Toán Bao Nhiêu Thì Sử Dụng Bấy Nhiêu Trong Số Tổng Dịch Vụ 360 Cung Cấp.</h6>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="card">
              <div class="card-body text-center">
                <i class="material-icons font-light">account_balance_wallet</i>
                <h4 class="font-19">Tổng Tiền</h4>
                <h4 class="bold green font-22">
                  <number
                    ref="number1"
                    :from="0"
                    :to="user.coin"
                    :format="theFormat"
                    :duration="1"
                    :delay="0"
                    easing="Power1.easeOut"
                  />
                </h4>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card">
              <div class="card-body text-center">
                <i class="material-icons font-light">account_balance</i>
                <h4 class="font-19">Tổng Đã Nạp</h4>
                <h4 class="bold green font-22">
                  <number
                    ref="number1"
                    :from="0"
                    :to="user.total_recharge"
                    :format="theFormat"
                    :duration="1"
                    :delay="0"
                    easing="Power1.easeOut"
                  />
                </h4>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card">
              <div class="card-body text-center">
                <i class="material-icons font-light">event_note</i>
                <h4 class="font-19">Ngày Sử Dụng</h4>
                <h4 class="bold green font-22">
                  <number
                    ref="number1"
                    :from="0"
                    :to="totalDayUse"
                    :format="theFormat"
                    :duration="1"
                    :delay="0"
                    easing="Power1.easeOut"
                  />
                </h4>
              </div>
            </div>
          </div>
        </div>
        <h3 class="mt-3">Dịch vụ</h3>
        <div class="row">
          <div
            class="col-md-4 col-12 mt-3 mb-2"
            v-show="index != 0"
            v-for="(item, index) in menus"
            :key="index"
          >
            <div @click="showMenu(item)" class="card card-menu">
              <div class="card-body py-4">
                <div class="row align-items-center px-1">
                  <div class="col">
                    <i :class="['mr-3 font-22', item.icon]"></i>
                    <span class="font-bold font-18">{{ item.text }}</span>
                  </div>
                  <div class="col-auto">
                    <i
                      class="material-icons font-light font-22"
                    >{{ !item.show ? "arrow_drop_down" : "arrow_drop_up" }}</i>
                  </div>
                </div>
              </div>
              <div v-show="item.show">
                <div
                  v-show="!child.admin || user.role === 'admin'"
                  v-for="(child, indexs) in item.childs"
                  :key="indexs"
                >
                  <router-link :to="child.to" class="router" aria-expanded="false">
                    <hr class="hr-menu" />
                    <div
                      :class="[indexs == item.childs.length - 1 ? 'child-menu-end' : 'child-menu']"
                    >
                      <h6
                        class="child-name font-bold font-14"
                      >{{ child.text ? child.text : child.name }}</h6>
                      <div class="row mb-1">
                        <div v-show="parseInt(child.price) > 0" class="col-6 pr-1">
                          <h6
                            v-show="child.price"
                            :title="child.price + '/ 1' + child.type"
                            class="font-12 mb-0 font-light badge badge-menu block-text"
                          >{{ child.price }} / 1 {{ child.type }}</h6>
                        </div>
                        <div class="col pr-0">
                          <h6
                            :class="['font-12 mb-0 badge font-light', child.isMaintenance ? 'badge-stop' : 'badge-run']"
                          >{{ child.isMaintenance ? "Bảo trì" : "Đang chạy" }}</h6>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="user.role == 'admin'" class="col-md-3 col-12">
        <h3 class="font-bold text-center">Quản lý Admin</h3>
        <div @click="$router.push('admin-user')" class="hand card card-info mt-4">
          <div class="card-body py-4">
            <h6 class="bold mb-0 ml-3">
              <i class="fas fa-cogs mr-2"></i> Quản lý người dùng
              <i class="float-right fas fa-caret-down"></i>
            </h6>
          </div>
        </div>
        <div class="hand card card-info mt-4">
          <div class="card-body py-4">
            <h6 class="bold mb-0 ml-3">
              <i class="far fa-calendar-check mr-2"></i> Cài đặt trang
              <i class="float-right fas fa-caret-down"></i>
            </h6>
          </div>
        </div>
        <div class="hand card card-info mt-4">
          <div class="card-body py-4">
            <h6 class="bold mb-0 ml-3">
              <i class="fas fa-sync-alt mr-2"></i> Quản lý hoàn tiền
              <i class="float-right fas fa-caret-down"></i>
            </h6>
          </div>
        </div>
        <div class="card shadow-0">
          <div class="card-body">
            <h3 class="font-bold text-center">Tạo thông báo</h3>
            <h6 class="bold mt-5">Nhập tiêu đề thông báo:</h6>
            <input v-model="title_noti" type="text" class="form-control input-gray mt-2" />
            <h6 class="bold mt-3">Nhập nội dung thông báo:</h6>
            <textarea
              class="form-control input-gray mt-2"
              rows="5"
              v-model="notes_noti"
              placeholder="Nhập nội dung"
            ></textarea>
            <button
              :class="['btn btn-block btn-lg btn-info btn-orange bold mt-3']"
              type="submit"
            >Lưu Thông Báo</button>
          </div>
        </div>
      </div>
      <div v-else class="col-md-3 col-12">
        <h3 class="font-bold text-center">Video Hướng Dẫn</h3>
        <iframe
          class="mt-2"
          width="100%"
          height="300"
          src="https://www.youtube.com/embed/u5WHetmQNrU"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h4 class="font-bold mt-4">Nạp tiền</h4>
        <div class="card mt-3 shadow-0">
          <div class="card-body">
            <template v-for="(bank, index) in paymentInfo">
              <section :key="index">
                <div class="row">
                  <div class="col-5">
                    <h6>Số tài khoản:</h6>
                  </div>
                  <div class="col">
                    <h6>
                      <span class="bold">{{ bank.account_number }}</span>
                    </h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <h6>Tên tài khoản:</h6>
                  </div>
                  <div class="col">
                    <h6>
                      <span class="bold">{{ bank.account_name }}</span>
                    </h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <h6>Ngân hàng:</h6>
                  </div>
                  <div class="col">
                    <h6>
                      <span class="bold">{{ bank.name }}</span>
                    </h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <h6>Chi Nhánh:</h6>
                  </div>
                  <div class="col">
                    <h6>
                      <span class="bold">{{ bank.branch }}</span>
                    </h6>
                  </div>
                </div>
              </section>
            </template>
          </div>
        </div>
        <div v-if="payment_syntax">
          <h4 class="font-bold mt-4">Nội dung chuyển khoản</h4>
          <div class="card mt-3 shadow-0">
            <div class="card-body">
              <h3 class="mb-0 bold text-center">{{ payment_syntax }}</h3>
            </div>
          </div>
        </div>
        <div class="mt-4" v-if="payment_note">
          <h4 class="font-bold mt-4">Hướng dẫn nạp tiền</h4>
          <div class="card mt-3 shadow-0">
            <div class="card-body">
              <h6 class="mb-0 text-center" v-html="payment_note"></h6>
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

export default {
  name: "home",
  data() {
    return {
      menu_list: [],
      menu_filter: [],
      is_read: false,
      menu_search: "",
      isSearch: false,
      menus: menus,
      title_noti: "",
      notes_noti: ""
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
