export const loginRouter = {
    path: "/login",
    component: () => import("../../views/auth/login.vue")
};

export const registerRouter = {
    path: "/register",
    component: () => import("../../views/auth/register")
};
export const fogetPasswordRouter = {
    path: "/forget-password",
    component: () => import("../../views/auth/forget-password")
};
