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
Vue.use(VueRouter)

// const routes = []

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/teacher'
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
        { path: '/modteacher', component: modTeacher,name:'modTeacher'},
        { path: '/modstudent', component: modStudent,name:'modStudent'}
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
});

export default router;
