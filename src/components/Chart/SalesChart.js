// Sales Widget
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
    extends: Bar,
    mixins: [reactiveProp],
    data: function() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label;
                            var value = tooltipItem.value;
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(",");
                            return [label + ": " + value];
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            // userCallback: function(value, index, values) {
                            // eslint-disable-next-line no-unused-vars
                            userCallback: function(value, index, values) {
                                // Convert the number to a string and splite the string every 3 charaters from the end
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);
                                // Convert the array to a string and format the output
                                value = value.join(",");
                                // return value + ' mCoin'
                                return value;
                            }
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        categoryPercentage: 0.5,
                        barPercentage: 0.8
                    }]
                },
                legend: {
                    onHover: function(e) {
                        e.target.style.cursor = "pointer";
                    },
                    align: "end",
                    display: true
                },
                hover: {
                    onHover: function(e) {
                        var point = this.getElementAtEvent(e);
                        if (point.length) e.target.style.cursor = "pointer";
                        else e.target.style.cursor = "default";
                    }
                }
            }
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
};