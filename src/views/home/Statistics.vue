<template>
    <div>
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
                            <datetime class="theme-green" type="date" v-model="startDate" format="dd/MM/yyyy" input-class="text-center input-light" value-zone="Asia/Ho_Chi_Minh"></datetime>
                        </div>
                        <div class="col-md-1 col-6 my-2 px-0">
                            <h6 class="font-bold mb-0">đến</h6>
                        </div>
                        <div class="col-md-4 col-6 my-2 px-0">
                            <datetime class="theme-green" type="date" v-model="startDate" format="dd/MM/yyyy" input-class="text-center input-light" value-zone="Asia/Ho_Chi_Minh"></datetime>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <sales :chart-data="chartData"></sales>
        <h5 class="text-center mt-3">
            <span class="bold mr-3 green">Tổng nạp: {{ total_paid }}</span
            ><span class="bold orange">Tổng chi: {{ total_used }}</span>
        </h5>
    </div>
</template>

<script>
import paymentApi from "@/api/payment";
import moment from "moment";
import Sales from "@/components/Chart/SalesChart";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

export default {
    name: "Statistics",
    data() {
        return {
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
            endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).toISOString(),
            chartData: {},
            data: [],
            total_used: 0,
            total_paid: 0,
            data_result: []
        };
    },
    components: {
        Sales,
        Datetime
    },
    computed: {
        loading() {
            return this.$store.state.loading;
        },
        window_size() {
            return this.$store.state.window_size;
        }
    },
    watch: {
        startDate() {
            this.getPayment();
        },
        endDate() {
            this.getPayment();
        }
    },
    methods: {
        returnDate: function(myDate) {
            myDate = new Date(myDate);
            return moment(myDate).format("YYYY-MM-DD");
        },
        getPayment: async function() {
            this.$store.commit("loading", true);
            let data = await paymentApi.getStatistics(this.returnDate(this.startDate), this.returnDate(this.endDate));
            this.$store.commit("loading", false);
            if (data.success) {
                this.data = data.data;
                this.total_used = data.total_used;
                this.total_paid = data.total_paid;
                this.createChart();
            } else {
                if (data.message) {
                    this.$swal("Lỗi", data.message, "error");
                } else {
                    this.$swal("Lỗi", JSON.stringify(data), "error");
                }
            }
        },
        createChartData: function() {
            let labelArray = [];
            let obj = this.data;
            let labelUsed = [];
            let labelPaid = [];
            for (const prop in obj) {
                labelArray.push(moment(prop).format("DD-MM-YYYY"));
                labelPaid.push(obj[prop].paid.replace(/,/g, ""));
                labelUsed.push(obj[prop].used.replace(/,/g, ""));
            }
            return { labelPaid, labelUsed, labelArray };
        },
        createChart: async function() {
            this.chartData = {};
            let chartData = this.createChartData();
            this.chartData = {
                labels: chartData.labelArray,
                datasets: [
                    {
                        type: "bar",
                        label: "Tiền nạp",
                        backgroundColor: "#1FAB89",
                        hoverBackgroundColor: "#1FAB89",
                        borderWidth: 0,
                        data: chartData.labelPaid
                    },
                    {
                        type: "bar",
                        label: "Tiền chi",
                        backgroundColor: "#FFB900",
                        hoverBackgroundColor: "#FFB900",
                        borderWidth: 0,
                        data: chartData.labelUsed
                    }
                ]
            };
        },
        selectFilter: function(item) {
            this.filters = item;
        }
    }
};
</script>
