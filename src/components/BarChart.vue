<script>
import { Bar } from "vue-chartjs";

export default {
    extends: Bar,
    mounted() {
        this.renderChart(
            {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [
                    {
                        label: "Tiền tiêu",
                        backgroundColor: "#FFC100",
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                    },
                    {
                        label: "Tiền nạp",
                        backgroundColor: "#352D7D",
                        data: [50, 70, 12, 44, 20, 13, 22, 65, 14, 32, 111, 31]
                    }
                ]
            },
            { responsive: true, maintainAspectRatio: false }
        );
    }
};
</script>
