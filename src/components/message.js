import Vue from 'vue'
const Message = Vue.extend(require('./message.vue'));

export default {
    install: (Vue) =>{
        Vue.prototype.$zyMessage ={
            showMsg(options){

            }
        }
    }
}