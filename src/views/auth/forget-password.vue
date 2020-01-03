<template>
    <div class="login">
        <h6 class="text-center">
            <img class="group-icon mb-3" src="assets/images/logo.png" alt="group-icon" width="79" />
        </h6>
        <h5 class="my-3 font-24 text-center">
            Quên mật khẩu
        </h5>
        <form>
            <div v-if="!is_send_phone" class="form-group">
                <label>Số điện thoại</label>
                <input v-model="phone_number" required type="text" class="form-control input-auth" placeholder="Số điện thoại" />
            </div>
            <div v-if="is_send_phone">
                <div class="form-group">
                    <label>Nhập mã OTP</label>
                    <input v-model="otp" required type="text" class="form-control input-auth" placeholder="Nhập mã OTP gửi về điện thoại của bạn" />
                </div>
                <div class="form-group">
                    <label>Nhập mật khẩu</label>
                    <input v-model="password" required type="password" class="form-control input-auth" placeholder="Mật khẩu mới" />
                </div>
                <div class="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <input v-model="password_confirm" required type="password" class="form-control input-auth" placeholder="Xác nhận mật khẩu mới" />
                </div>
            </div>
            <div class="text-center mt-5">
                <button @click="forgetPassWord()" type="submit" :disabled="loading.login" :class="['btn btn-blue btn-block bold btn-end', { loading: loading.login }]">
                    {{ is_send_phone ? "Cấp lại mật khẩu" : "Xác nhận yêu cầu" }}
                </button>
            </div>
            <div class="text-center mt-3">
                <button @click="$router.push('/login')" :disabled="loading.login" :class="['btn btn-white btn-block bold', { loading: loading.login }]">
                    Đăng nhập
                </button>
            </div>
        </form>
    </div>
</template>

<script>
// import { forgetPassWord } from "../../api/auth";
export default {
    name: "login",
    data() {
        return {
            phone_number: "",
            is_send_phone: false,
            loading: false,
            otp: "",
            password: "",
            password_confirm: ""
        };
    },
    methods: {
        async forgetPassWord() {
            this.is_send_phone = !this.is_send_phone;
            // if (!this.is_send_phone) {
            //     let param = {
            //         phone_number: this.phone_number
            //     };
            //     let data = await forgetPassWord(param);
            //     console.log(data);
            //     this.is_send_phone = true;
            // }
        }
    }
};
</script>
