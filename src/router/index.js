import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => 
    import("../views/Landing.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/Auth.vue"),
    children: [
      {
        path: "/auth/login",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/auth/Login.vue"),
      },
      {
        path: "/auth/register",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/auth/Register.vue"),
      },
    ],
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: () =>
      import("../views/Contacts.vue"),
    
  },
  // {
  //   path: "/landing",
  //   name: "Landing",
  //   component: () =>
  //     import("../views/Landing.vue"),
    
  // },
  {
    path: "/auth/register",
    name: "Register",
    component: () =>
      import("../views/auth/Register.vue"),
    
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () =>
      import("../views/auth/Login.vue"),
    
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
