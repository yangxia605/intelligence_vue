import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Register from '../components/Register'
import Forget from '../components/Forget'
import Beginner from '../views/Beginner'

Vue.use(Router)

import Layout from '../layout'

export const constantRoutes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Layout,
    //redirect: '/dashboard',
    children: [{
      path: '',
      name: 'Dashboard',
      component: () => import('../views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forget',
    name: 'Forget',
    component: Forget
  },
  {
    path: '/beginner',
    name: 'Beginner',
    component: Beginner
  },
  {
    path: '/questionBank',
    component: Layout,
    children: [{
      path: '',
      name: 'questionBank',
      component: () => import('../views/questionBank/index'),
      meta: { title: '题库', icon: 'el-icon-s-claim' },
    },
    {
      path: ':topicId', //题目ID
      hidden: true, //不在侧边栏线上
      component: () => import('../views/questionPage/index'),
    }]
  },
  {
    path: '/aboutme',
    component: Layout,
    children: [{
      path: '',
      name: 'aboutme',
      component: () => import('../views/aboutMe/index'),
      meta: { title: '个人信息', icon: 'el-icon-s-custom' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: '',
      name: 'discussion',
      component: () => import('../views/aboutMe/index'),
      meta: { title: '讨论区', icon: 'el-icon-s-comment' }
    }]
  },
  {
    path: '/codereader',
    component: Layout,
    children: [{
      path: '',
      name: 'aboutme',
      component: () => import('../views/codereader'),
      meta: { title: '代码阅读', icon: 'el-icon-s-opportunity' }
    }]
  }
]


const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
