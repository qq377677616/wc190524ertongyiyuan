import Vue    from 'vue'
import App    from './App.vue'
import router from './router'
//通讯IM SDK
// import './util/webim'
//rem适配
import './util/flexible'
//Swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'

//Swiper组件样式文件
import 'swiper/dist/css/swiper.css'

//element-ui
import './plugins/element.js'
import animated from 'animate.css'
//VUEX
import store from './store'
//Axios
import myAxios from './util/request'
import axios from 'axios'
import Qs from 'qs'

import moment from 'moment'
// import "./util/imchat"
import "./util/wxConfig"




import './util/default'

// Vue.use(webim);
Vue.use(animated);
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
Vue.prototype.$axios = myAxios;
Vue.prototype.$axios.all = axios.all;
Vue.prototype.$axios.spread = axios.spread;
Vue.prototype.$moment = moment;
Vue.prototype.$Qs = Qs;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
