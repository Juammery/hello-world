import Vue from "vue";
import Router from "vue-router";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);

const vueRouter = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/home2",
      name: "home2",
      component: () => import("./views/Home2.vue")
    },
    // 个人中心页面
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("./views/statistics/statistics.vue")
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/Admin/index.vue")
    },
    // 引导页面
    {
      path: "/guide",
      name: "guide",
      component: () => import("./views/guide")
    },

    {
      // 最外层的
      path: "/",
      name: "outermost",
      component: () => import("./views/Outermost/index"),
      children: [
        // 进去第一个父判断的页面
        {
          path: "subject",
          name: "subject",
          component: () => import("./views/Subject/index")
        },
        {
          path: "warn",
          name: "warn",
          component: () => import("./views/warn/index")
        },
        // 进去第2个根据父判断变化的子判断页面
        {
          path: "business",
          name: "business",
          component: () => import("./views/Business/index")
        },
        // 进去填写数据页面
        {
          path: "fillform",
          name: "fillform",
          component: () => import("./views/FillForm/index")
        },
        // 表单生成页面
        {
          path: "generate",
          name: "generate",
          component: () => import("./views/Generate/index")
        },
        {
          path: "logistics",
          name: "logistics",
          component: () => import("./views/logistics/index")
        }
      ]
    }
  ]
});

vueRouter.beforeEach((to, from, next) => {
  next();
  // if (
  //   !Vue.prototype.getSession("themeId") &&
  //   to.name !== "home" &&
  //   to.name !== "statistics" &&
  //   to.name !== "admin"
  // ) {
  //   vueRouter.push({ name: "home" });
  // } else {
  //   next();
  // }
});
export default vueRouter;
