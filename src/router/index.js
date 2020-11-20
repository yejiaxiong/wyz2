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
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/teacher',
      component: Teacher,
      name:'Teacher',
      children: [
        { path: '/', redirect: '/luru' },
        { path: '/luru', component: Luru, name:'luru' },
        { path: '/changepwd', component: ChangePwd }
      ]
    },
    {
      path: '/student',
      component: Student,
      name:'Student',
      children: [
        { path: '/', redirect: '/myscore' },
        { path: '/changepwd2', component: ChangePwd2 },
        { path: '/myscore', component: Myscore, name:'myscore' }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      name: 'Admin',
      redirect: '/adminWel',
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
      component: Login,
      name:'Login'
    }
  ]
});

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === '/login') {
    return next()
  }
  
  // 学生
  if (to.path === '/student' || to.path === '/myscore' || to.path === '/changepwd2'){
    // 获取token
    const id = window.sessionStorage.getItem('stuid')

    // 没有token, 强制跳转到登录页
    if (!id) {
      return next('/login')
    }
  }

  // 管理员
  if (to.path === '/admin' || to.path === '/adminWel' || to.path === '/addstudent' || to.path === '/adminstudent' || to.path === '/addteacher' || to.path === '/adminteacher' || to.path === '/modteacher' || to.path === '/modstudent' || to.path === '/adminwel'){
    // 获取token
    const id = window.sessionStorage.getItem('adminid')

    // 没有token, 强制跳转到登录页
    if (!id) {
      return next('/login')
    }
  }

  // 教师
  if (to.path === '/teacher' || to.path === '/luru' || to.path === '/changepwd'){
    // 获取token
    const id = window.sessionStorage.getItem('teacherid')

    // 没有token, 强制跳转到登录页
    if (!id) {
      return next('/login')
    }
  }
  next()
})

export default router;
