/** When your routing table is too long, you can split it into small modules* */
// import store from "@/store";

const dashboardRouter = {
    path: "/",
    component: () =>
        import ("@/layout/dashboard.vue"),
    redirect: { name: "Home" },
    beforeEnter(to, from, next) {
        // if (store.state.user.api_token) {
        // } else {
        //     next("/login");
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