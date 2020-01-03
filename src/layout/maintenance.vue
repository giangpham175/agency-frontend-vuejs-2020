<template>
    <div>
        <div class="container-fluid text-center mt-4">
            <div class="card">
                <div class="card-body">
                    <h1 class="mb-3">Tính Năng Đang Được Nâng Cấp</h1>
                    <img :src="user.avatar_id ? 'https://graph.facebook.com/' + user.avatar_id + '/picture?width=200&height=200' : 'assets/images/users/avatar_fb.jpg'" class="img-circle img-avatar" width="100" />
                    <h4 class="card-title data-user-name mt-3">Xin chào, {{ user.name }}</h4>
                    <p>
                        Tính năng <span class="text-primary">{{ breadcrumbs[breadcrumbs.length - 1] }}</span> mà bạn đang truy cập tạm thời ngưng hoạt động để nâng cấp.
                    </p>
                    <p>Vui lòng liên hệ với Quản Trị Viên để biết thêm chi tiết.</p>
                    <p class="text-xs-right pr-5"><em>Dev team</em></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import menus from "@/config/menu";
export default {
    data() {
        return {};
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        tools() {
            return this.$store.state.tools;
        },
        breadcrumbs() {
            let breadcrumbs = [];
            // if (this.$route.name =)
            menus.forEach(item => {
                let currentTool = this.tools.find(tool => {
                    return tool.name === this.$route.name;
                });
                if (item.childs) {
                    let child = item.childs.find(c => {
                        return c.name === this.$route.name;
                    });
                    if (child && currentTool) {
                        child.notes = currentTool.notes;
                    }
                    if (child) {
                        breadcrumbs.push(item.notes ? item.notes : item.text);
                        breadcrumbs.push(child.notes ? child.notes : child.text);
                    }
                } else {
                    if (item.to === this.$route.path) {
                        if (currentTool) {
                            item.notes = currentTool.notes;
                        }
                        breadcrumbs.push(item.notes ? item.notes : item.text);
                    }
                }
            });
            return breadcrumbs;
        }
    }
};
</script>
<style scoped></style>
