<template>
    <div class="row">
        <div class="col-md-9 col-12">
            <Statisitc />
            <SSale />
            <SCustomer />
        </div>

        <div class="col-md-3 col-12">
            <TopUser />
            <SService />
        </div>
    </div>
</template>

<script>
import Statisitc from "./report-statistic";
import SCustomer from "./report-statistic-customer";
import SSale from "./report-statistic-sale";
import SService from "./report-statistic-service.vue";
import TopUser from "./report-top-user";

export default {
    name: "report",
    components: {
        Statisitc,
        SCustomer,
        SSale,
        SService,
        TopUser
    },
    computed: {
        // user() {
        //   return this.$store.state.user.user;
        // }
    },
    methods: {
        // theFormat(number) {
        //   return number
        //     ? Math.round(Number(number))
        //         .toString()
        //         .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        //     : 0;
        // }
    }
};
</script>
