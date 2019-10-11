import Vue from 'vue'
import { Progress, Rate, Row, Col,Input,Icon,Radio} from 'element-ui'
import { Area,DatetimePicker, Picker,Toast,Dialog,Uploader} from 'vant';
// import 'vant/lib/Area/style'
import 'vant/lib/datetime-picker/style'
import 'vant/lib/picker/style'
import 'vant/lib/toast/style'
import 'vant/lib/dialog/style'
import 'vant/lib/uploader/style'
import 'vant/lib/image-preview/style'

// import 'mint-ui/lib/picker/style.css'
// import { Picker } from 'mint-ui';

// Vue.component(Picker.name, Picker);
Vue.use(Area);
Vue.use(DatetimePicker);
Vue.use(Picker);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Uploader);
// Vue.use(ImagePreview);

Vue.use(Progress);
Vue.use(Rate);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Radio);
