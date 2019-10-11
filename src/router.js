import Vue    from 'vue'
import Router from 'vue-router'
import Index  from './views/Index.vue'

//咨询相关路由
import consult from './views/consult/index'
import banner from './views/doctor/banner'
import featured from './views/consult/featured'
import featuredDetailed from './views/consult/featuredDetailed'
import featuredReservation from './views/consult/featuredReservation'
import dynamicdetails from './views/consult/dynamicdetails'
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
import articleAndVideoList from './views/consult/articleAndVideoList'
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
import arrangement from './views/consult/personal/arrangement'
import specialService from './views/consult/personal/specialService'
import refund from './views/consult/personal/refund'

//医生端
import doctorPersonal from './views/doctor/personal'
import doctorExpert from './views/doctor/expert'
import reply from './views/doctor/reply'
import otherExperts from './views/doctor/otherExperts'
import graphic from './views/doctor/graphic'
import TeamList from './views/doctor/TeamList'
import index2 from './views/doctor/index'
import editing from './views/doctor/editing'
import studioId from './views/doctor/studioId'
import release from './views/doctor/release'
import upload from './views/doctor/articleUpload'
import register from './views/doctor/register'
import doctorMessage from './views/doctor/doctorMessage'
import myorder from './views/doctor/myorder'
import advisoryOrder from './views/doctor/advisoryOrder'
// import temaInfo from './views/doctor/temaInfo'
import temaInfo from './views/doctor/temaInfo'
import studioGraphic from './views/doctor/studioGraphic'

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

//聊天相关
import messages from './views/imchat/messages'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/messages',
      name:'消息列表',
      component:messages
    },
    {
      path:'/consult/banner',
      name:'详细',
      component:banner
    },
    {
      path:'/consult/queue',
      name:'挂号',
      component:queue
    },
    {
      path:'/consult/featured',
      name:'特色项目',
      component:featured
    },
    {
      path:'/consult/dynamicdetails',
      name:'动态详情',
      component:dynamicdetails
    },
    {
      path:'/consult/featured/detailed',
      name:'特色项目详细',
      component:featuredDetailed
    },
    {
      path:'/consult/featured/featuredreservation',
      name:'特色项目预约',
      component:featuredReservation
    },
    {
      path:'/consult/queue/bespeak',
      name:'医生预约',
      component:bespeak
    },
    {
      path:'/consult/queue/payForm',
      name:'支付订单',
      component:payForm
    },
    {
      path:'/consult/queue/visitingtime',
      name:'预约时间',
      component:visitingTime,
      children:[
        {
          path:'/consult/queue/visitingtime/',
          component:patientInfo,
          name:'预约医生详情'
        },
        {
          path:'/consult/queue/visitingtime/outpatient',
          name:'预约资料填写',
          component:outpatient
        }
      ],
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
      path:'/login/patient/one',
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
      name:'咨询-选择工作室/医生',
      component:registered
    },

    {
      path:'/consult/advisory',
      name:'我的医生',
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
      name:'评论',
      component:comment
    },
    {
      //专家动态
      path:'/consult/registered/doctorexpert',
      name:'专家动态',
      component:doctorExpert
    },
    {
      //团队列表
      path:'/consult/registered/knowndoctor',
      name:'医生详情',
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
      name:'咨询订单',
      component:phoneservice
    },
    {
      //医生电话、视频、图文咨询
      path:'/consult/registered/doctorservice',
      name:'医生咨询',
      component:doctorService
    },

    {
      //工作室详情
      path:'/consult/registered/doctordetails',
      name:'工作室详情',
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
      name:'文章列表',
      component:articleList
    },
    {
      //文章详情
      path:'/consult/registered/articledetails',
      name:'文章详情',
      component:articleDetails
    },
    {
      path: '/consult/registered/articleAndVideoList',
      name:'列表',
      component: articleAndVideoList,
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
      name:'资料编辑',
      component:fillout
    },
    {
      // 创建患者信息
      path:'/consult/registered/existingdata',
      name:'患者选择',
      component:existingData
    },

    //  用户中心
    {
      //关注医生列表
      path:'/consult/personal/attention',
      component:attention,
      name:'我关注的医生/工作室'
    },
    {
      path:'/consult/personal/personal',
      component:personal,
      name:'个人中心'
    },
    {
      path:'/consult/personal/doctors',
      component:userDoctors,
      name:'我咨询的医生'
    },
    {
      path:'/consult/personal/arrangement',
      component:arrangement,
      name:'我的挂号'
    },
    {
      path:'/consult/personal/specialservice',
      component:specialService,
      name:'项目订单'
    },
    {
      path:'/consult/personal/refund',
      component:refund,
      name:'退款'
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
      name:'对话',
      component:privateChat
    },

    //医生端
    {
      //个人中心
      path:'/doctors/doctorpersonal',
      name:'个人中心-医生',
      component:doctorPersonal
    },
    // {
    //   //专家动态
    //   path:'/doctors/expert',
    //   name:'个人中心-医生',
    //   component:expert
    // },
    {
      //回复我的
      path:'/doctors/reply',
      name:'回复我的',
      component:reply
    },
    {
      //其他专家详情
      path:'/doctors/otherexperts',
      name:'工作室成员',
      component:otherExperts
    },
    {
      //图文患者
      path:'/doctors/graphic',
      name:'咨询订单-医生',
      component:graphic
    },
    {
      //团队订单
      path:'/doctors/studiographic',
      name:'团队订单',
      component:studioGraphic
    },
    {
      //团队列表
      path:'/doctors/teamlist',
      name:'工作室列表',
      component:TeamList
    },
    {
      //医生端首页
      path:'/doctors/index',
      name:'首页',
      component:index2
    },
    {
      //我的诊室
      path:'/doctors/studioid',
      name:'我的诊室',
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
      name:'发布动态',
      component:release
    },
    {
      //文章上传
      path:'/doctors/upload',
      name:'文章上传',
      component:upload
    },
    {
      //团队信息
      path:'/doctors/temainfo',
      name:"工作室申请",
      component:temaInfo
    },
    {
      //挂号订单
      path:'/doctors/register',
      name:"挂号订单",
      component:register
    },
    {
      //消息列表
      path:'/doctors/doctormsg',
      name:'患者消息列表',
      component:doctorMessage
    },
    {
      //挂号订单
      path:'/doctors/myorder',
      name:'医生-我的挂号',
      component:myorder
    },
    {
      //咨询订单
      path:'/doctors/advisoryorder',
      name:'医生-我的咨询',
      component:advisoryOrder
    },
  ]
})
