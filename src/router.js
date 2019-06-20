import Vue    from 'vue'
import Router from 'vue-router'
import Index  from './views/Index.vue'

//咨询相关路由
import consult from './views/consult/index'
import registered from './views/consult/registered'
import advisory from './views/consult/advisory'
import doctors from './views/consult/doctors'
import help from './views/consult/help'
import comment from './views/consult/comment'
import expert from './views/consult/expert'
import patient from './views/consult/queue/patient'
import phoneservice from './views/consult/phoneservice'
import knownDoctor from './views/consult/knownDoctor'
import doctorService from './views/consult/doctorService'


import doctorDetails from './views/consult/doctorDetails'
import advisorySelect from './views/consult/advisorySelect'
import articleList from './views/consult/articleList'
import articleDetails from './views/consult/articleDetails'
import introduction from './views/consult/introduction'
import teamIntroduction from './views/consult/teamIntroduction'
import attention from './views/consult/personal/attention'
import fillout from './views/consult/fillout'
import existingData from './views/consult/existingData'
import consultancy from './views/consult/consultancy'

//个人中心
import personal from './views/consult/personal/personal'
import userDoctors from './views/consult/personal/doctors'
import patientManagement from './views/consult/personal/patientManagement'
import addPatient from './views/consult/personal/addPatient'
import privateChat from './views/consult/personal/privateChat'

//医生端
import doctorPersonal from './views/doctor/personal'
import reply from './views/doctor/reply'
import otherExperts from './views/doctor/otherExperts'
import graphic from './views/doctor/graphic'
import TeamList from './views/doctor/TeamList'
import index2 from './views/doctor/index'
import editing from './views/doctor/editing'
import studioId from './views/doctor/studioId'
import release from './views/doctor/release'
import upload from './views/doctor/articleUpload'
// import temaInfo from './views/doctor/temaInfo'
import temaInfo from './views/doctor/temaInfo'

//挂号
import queue from './views/consult/queue/index'
import bespeak from './views/consult/queue/bespeak'
import visitingTime from './views/consult/queue/visitingTime'
import patientInfo from './views/consult/queue/patientInfo'
import outpatient from './views/consult/queue/outpatient'
import payForm from './views/consult/queue/payForm'

//登陆
import loginPatient from './views/login/patient/index'
import loginPatientSecond from './views/login/patient/second'
import loginOne from './views/login/one'

import one from './views/consult/knownDoctor'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/consult/queue',
      name:'挂号',
      component:queue
    },
    {
      path:'/consult/queue/bespeak',
      name:'医生预约',
      component:bespeak
    },
    {
      path:'/consult/queue/payForm',
      name:'支付',
      component:payForm
    },
    {
      path:'/consult/queue/visitingtime',
      name:'预约时间',
      component:visitingTime,
      children:[
        {
          path:'/consult/queue/visitingtime/patientinfo',
          component:patientInfo
        },
        {
          path:'/consult/queue/visitingtime/outpatient',
          component:outpatient
        }
      ],redirect:'/consult/queue/visitingtime/patientinfo'
    },
    //  登陆
    //  医生
    {
      path:'/login/patient/index',
      name:'patientLogin',
      component:loginPatient,
    },
    {
      path:'/login/patient/second',
      name:'patientSecond',
      component:loginPatientSecond,
    },
    {
      path:'/login/patient/One',
      name:'loginOne',
      component:loginOne,
    },

    {
      path:'/abc',
      component:one
    },
    {
      path:'*',
      redirect:'/index'
    },
    {
      path: '/index',
      name: '主页',
      component: Index
    },
    {
      path:'/consult',
      name:'咨询',
      component: consult,
    },
    {
      path:'/consult/registered',
      name:'咨询-选择医院',
      component:registered
    },

    {
      path:'/consult/advisory',
      component:advisory
    },
    {
      path:'/consult/registered/doctors',
      name:'医生列表',
      component:doctors
    },
    {
      path:'/consult/registered/consultancy',
      name:'consultancy',
      component:consultancy
    },
    {
      path:'/consult/registered/help',
      component:help
    },
    {
      //评价
      path:'/consult/registered/comment',
      component:comment
    },
    {
      //团队列表
      path:'/consult/registered/expert',
      component:expert
    },
    {
      //团队列表
      path:'/consult/registered/knowndoctor',
      component:knownDoctor
    },
    {
      //投票
      path:'/consult/registered/patient',
      component:patient
    },
    {
      //电话、视频、图文咨询
      path:'/consult/registered/phoneservice',
      component:phoneservice
    },
    {
      //医生电话、视频、图文咨询
      path:'/consult/registered/doctorservice',
      component:doctorService
    },

    {
      //工作室详情
      path:'/consult/registered/doctordetails',
      name:'doctorDetails',
      component:doctorDetails
    },
    {
      //专家选择
      path:'/consult/registered/advisoryselect',
      component:advisorySelect
    },
    {
      //文章列表
      path:'/consult/registered/articlelist',
      name:'articleList',
      component:articleList
    },
    {
      //文章详情
      path:'/consult/registered/articledetails',
      name:'articleDetails',
      component:articleDetails
    },
    {
      //医生详细
      path:'/consult/registered/introduction',
      component:introduction
    },
    {
      //团队详细
      path:'/consult/registered/teamintroduction',
      component:teamIntroduction
    },

    {
      //填资料
      path:'/consult/registered/fillout',
      component:fillout
    },
    {
      // 创建患者信息
      path:'/consult/registered/existingdata',
      component:existingData
    },

    //  用户中心
    {
      //关注医生列表
      path:'/consult/personal/attention',
      component:attention,
      name:'我关注的医生'
    },
    {
      path:'/consult/personal/personal',
      component:personal,
      name:'个人中心'
    },
    {
      path:'/consult/personal/doctors',
      component:userDoctors,
      name:'我预约的医生'
    },
    {
      path:'/consult/personal/patientmanagement',
      component:patientManagement,
      name:'个人信息管理'
    },
    {
      path:'/consult/personal/addpatient',
      component:addPatient,
      name:'添加患者信息'
    },
    {
      path:'/consult/personal/privatechat',
      component:privateChat
    },

    //医生端
    {
      //个人中心
      path:'/doctors/doctorpersonal',
      component:doctorPersonal
    },
    {
      //回复我的
      path:'/doctors/reply',
      component:reply
    },
    {
      //其他专家详情
      path:'/doctors/otherexperts',
      component:otherExperts
    },
    {
      //图文患者
      path:'/doctors/graphic',
      name:'graphic',
      component:graphic
    },
    {
      //团队列表
      path:'/doctors/teamlist',
      component:TeamList
    },
    {
      //医生端首页
      path:'/doctors/index',
      component:index2
    },
    {
      //我的诊室
      path:'/doctors/studioid',
      component:studioId
    },
    {
      //资料编辑
      path:'/doctors/editing',
      component:editing
    },
    {
      //资料编辑
      path:'/doctors/release',
      component:release
    },
    {
      //文章上传
      path:'/doctors/upload',
      component:upload
    },
    {
      //团队信息
      path:'/doctors/temainfo',
      component:temaInfo
    },
  ]
})
