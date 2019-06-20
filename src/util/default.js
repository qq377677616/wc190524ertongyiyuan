/*页面默认js*/
import Vue from 'vue'
//VConsole配置
import VConsole from 'vconsole'

if (process.env.NODE_ENV != 'development') {
    const vConsole = new VConsole()
}
// const vConsole = new VConsole()
//腾讯统计
var _mtac = {"performanceMonitor":1,"senseQuery":1};
(function() {
    var mta = document.createElement("script");
    mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
    mta.setAttribute("name", "MTAH5");
    mta.setAttribute("sid", "500685158");
    mta.setAttribute("cid", "500685160");
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(mta, s);
})();
// console.log(_mtac)