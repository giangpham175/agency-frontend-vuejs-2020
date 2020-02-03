<template>
    <div class="statistic">
        <div class="row p-3">
            <h3 class="font-bold align-self-center">Báo cáo</h3>
            <h6 class="m-0 ml-auto mr-3 align-self-center">Hiển thị</h6>
            <select class="align-self-center">
                <option value="month">Tháng này</option>
                <option value="week">Tuần này</option>
            </select>
        </div>
        <div class="row mt-3 justify-content-between">
            <div class="col">
                <div class="card card-report">
                    <div class="card-body text-center">
                        <i class="material-icons font-light">input</i>
                        <h4 class="text-uppercase font-14">Tổng Nạp</h4>
                        <h4 class="bold green font-22">
                            <number ref="number1" :from="0" :to="user.coin" :format="theFormat" :duration="1" :delay="0" easing="Power1.easeOut" />
                        </h4>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body text-center">
                        <i class="material-icons font-light">view_carousel</i>
                        <h4 class="text-uppercase font-14">Tổng Dùng</h4>
                        <h4 class="bold green font-22">waiting...</h4>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body text-center">
                        <i class="material-icons font-light">account_balance_wallet</i>
                        <h4 class="text-uppercase font-14">Doanh Thu</h4>
                        <h4 class="bold green font-22">waiting...</h4>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body text-center">
                        <i class="material-icons font-light">group</i>
                        <h4 class="text-uppercase font-14">Khách Hàng</h4>
                        <h4 class="bold green font-22">waiting...</h4>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body text-center">
                        <i class="material-icons font-light">check_box</i>
                        <h4 class="text-uppercase font-14">Dịch Vụ</h4>
                        <h4 class="bold green font-22">waiting...</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "statistic",
    computed: {
        user() {
            return this.$store.state.user.user;
        }
    },
    methods: {
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
