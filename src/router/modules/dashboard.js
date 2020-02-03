/** When your routing table is too long, you can split it into small modules* */
// import store from "@/store";
// import store from "../../store";

const dashboardRouter = {
    path: "/",
    component: () =>
        import ("@/layout/dashboard.vue"),
    redirect: { name: "Home" },
    beforeEnter(to, from, next) {
        // let isDangNhap = !!store.state.token;
        // let isRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
        // if (isDangNhap && to.path === "/login") {
        //     return next("/");
        // } else if (isRequiresAuth && !isDangNhap) {
        //     return next("/login");
        // }
        next();
    },
    children: [{
            path: "/home",
            name: "Home",
            meta: { requiresAuth: true },
            component: () =>
                import ("@/views/home/home.vue")
        },
        {
            path: "/home1",
            name: "Home1",
            meta: { requiresAuth: true },
            component: () =>
                import ("@/views/home/home1.vue")
        },
        // {
        //     path: "/admin-user",
        //     name: "AdminUser",
        //     meta: { requiresAuth: true },
        //     component: () =>
        //         import ("@/views/admin/client/client-manager.vue")
        // },
        {
            path: "/report",
            name: "Report",
            meta: { requiresAuth: true },
            component: () =>
                import ("@/views/admin/report/report.vue")
        }
    ]
};

export default dashboardRouter;