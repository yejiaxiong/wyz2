import Vue from 'vue'
import VueRouter from 'vue-router'
import Teacher from '../components/Teacher.vue'
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
import Classluru1 from '../view/Classluru1.vue'
import Classluru2 from '../view/Classluru2.vue'
import Classluru3 from '../view/Classluru3.vue'
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
        { path: '/classluru1', component: Classluru1, name:'classluru1' },
        { path: '/classluru2', component: Classluru2, name:'classluru2' },
        { path: '/classluru3', component: Classluru3, name:'classluru3' },
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
  
  // 学生相关页面
  if (to.path === '/student' || to.path === '/myscore' || to.path === '/changepwd2'){
    const id = window.sessionStorage.getItem('stuid')

    if (!id) {
      return next('/login')
    }
  }

  // 管理员相关页面
  if (to.path === '/admin' || to.path === '/adminWel' || to.path === '/addstudent' || to.path === '/adminstudent' || to.path === '/addteacher' || to.path === '/adminteacher' || to.path === '/modteacher' || to.path === '/modstudent' || to.path === '/adminwel'){
    const id = window.sessionStorage.getItem('adminid')

    if (!id) {
      return next('/login')
    }
  }

  // 教师相关页面
  if (to.path === '/teacher' || to.path === '/luru' || to.path === '/changepwd'){
    const id = window.sessionStorage.getItem('teacherid')

    if (!id) {
      return next('/login')
    }
  }
  next()
})

export default router;
