import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/Login.vue'
import register from '../page/RegisterEnt.vue'
import myInfo from '../page/MyInfo.vue'
import showJob from '../page/ShowJob.vue'
import showJobInfo  from '../page/ShowJobInfo.vue'
import updataEnt from '../page/Updata_Ent.vue'
import passHr from '../page/PassHR.vue'
import myHr from '../page/MyHR.vue'
import updataPass from '../page/UpdataPass.vue'
Vue.use(Router)

export default new Router({
   mode: 'history',
  routes: [
     {
      path: '/',
      name: 'myInfo',
      component: myInfo
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },{
      path: '/user/register',
      name: 'register',
      component:register
    },{
      path: '/myInfo',
      name:'myInfo',
      component:myInfo
    },{
      path:'/showJob',
      name:'showJob',
      component:showJob,
    }
    ,{
      path:'/showJobInfo',
      name:'showJobInfo',
      component:showJobInfo
    },{
        path:'/updataEnt',
      name:'updataEnt',
      component:updataEnt
    },{
      path:'/passHr',
      name:'passHr',
      component:passHr
    },{
      path:'/myHr',
      name:'myHr',
      component:myHr
    },{
      path:'/updataPass',
      name:'updataPass',
      component:updataPass
    },

  ]

})
