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
    path: "/matches",
    name: "matches",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Matches.vue")
  },{
    path: "/teams",
    name: "teams",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Teams.vue")
  },{
    path: "/players",
    name: "players",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Players.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
