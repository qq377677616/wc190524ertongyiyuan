import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    conversationList:[],
    loginStd:false,
    historical:[],
    newMessage:{},
    images:{},
    myAvatar:'',
    userIdentifier:'',
  },
  mutations: {
    setUserIdentifier(state, id){
      state.userIdentifier = id
    },
    setSendImage(state,img){
      state.images = img
    },
    setMyAvatar(state, imgUrl){
      state.myAvatar = imgUrl
    },
    getConversationList(state, list){
      //储存对话列表 list
      state.conversationList = list
    },
    setLoginStd(state, std){
      //是否登录
      state.loginStd = std
    },
    getHistorical(state,std){
      state.historical = std
    },
    getNewMessage(state,text){
      state.newMessage = text
    }
  },
  actions: {

  }
})
