import Vue from 'vue'
import VueRouter from 'vue-router'
import Teacher from '../components/Teacher.vue'
import Luru from '../view/Luru.vue'
import ChangePwd from '../view/ChangePwd.vue'
import ChangePwd2 from '../view/ChangePwd2.vue'
import Myscore from '../view/Myscore.vue'
import Student from '../components/Student.vue'
import Login from '../components/Login.vue'
import Admin from '../components/Admin.vue'
import addStudent from '../view/addStudent.vue'
import adminStudent from '../view/adminStudent.vue'
import addTeacher from '../view/addTeacher.vue'
import adminTeacher from '../view/adminTeacher.vue'
import modStudent from '../view/modStudent.vue'
import modTeacher from '../view/modTeacher.vue'
import adminWel from '../view/adminWel.vue'
Vue.use(VueRouter)

// const routes = []

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/admin'
    },
    {
      path: '/teacher',
      component: Teacher,
      children: [
        { path: '/', redirect: '/luru' },
        { path: '/luru', component: Luru },
        { path: '/changepwd', component: ChangePwd }
      ]
    },
    {
      path: '/student',
      component: Student,
      children: [
        { path: '/', redirect: '/myscore' },
        { path: '/changepwd2', component: ChangePwd2 },
        { path: '/myscore', component: Myscore }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        { path: '/addstudent', component: addStudent },
        { path: '/adminstudent', component: adminStudent,name:'adminStudent'},
        { path: '/addteacher', component: addTeacher },
        { path: '/adminteacher', component: adminTeacher,name:'adminTeacher'},
        { path: '/modteacher:rows', component: modTeacher,name:'modTeacher'},
        { path: '/modstudent:rows', component: modStudent, name: 'modStudent' },
        { path: '/adminwel', component: adminWel }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
});


// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
/*router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})*/

export default router;
