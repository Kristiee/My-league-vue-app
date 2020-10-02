import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Standings",
    component: Home
  },
  {
    path: "/match",
    name: "match",
    component: () =>
    import("../views/Match.vue")
  },{
    path: "/teams",
    name: "teams",
    component: () =>
      import(/* webpackChunkName: "teams" */ "../views/Teams.vue")
  },{
    path: "/players",
    name: "players",
    component: () =>
      import(/* webpackChunkName: "players" */ "../views/Players.vue")
  },
  {
    path: "/club/:id",
    name: "club",
    component: () =>
      import("../views/Club.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
