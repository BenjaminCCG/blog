import Vue from "vue";
import VueRouter from "vue-router";
import NProgress  from 'nprogress';
import 'nprogress/nprogress.css' 
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/",
    component: () => import("@/views/layout"),
    redirect: "/home",
    children: [
      {
        path: "about",
        component: () => import("@/views/about"),
        meta: { title: "关于我" },
      },
      {
        path: "board",
        component: () => import("@/views/board"),
        meta: { title: "留言板" },
      },
      {
        path: "appreciate",
        component: () => import("@/views/appreciate"),
        meta: { title: "赞赏" },
      },
      {
        path: "home",
        component: () => import("@/views/home"),
        meta: { title: "首页" },
      },
      {
        path: "article/:id",
        component: () => import("@/views/article"),
        meta: { title: "文章详情" },
      },
      {
        path: "classify/:type",
        component: () => import("@/views/classify"),
        meta: { title: "文章分类" },
      },
    ],
  },
];
NProgress .configure({ showSpinner: false }) 
const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from,next)=>{
  NProgress .start();
  next()
})
router.afterEach((to, from) => {
  document.title = to.meta.title;
  NProgress.done()
});
export default router;
