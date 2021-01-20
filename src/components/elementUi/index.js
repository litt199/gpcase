import Vue from 'vue';
import {
    Row,
    Col,
    Form,
    FormItem,
    Input,
    Tooltip,
    Select,
    Option,
    Message,
    Loading,
} from 'element-ui';

const components = {
    Row,
    Col,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Tooltip,
}
Vue.prototype.$message = Message;
Vue.use(Loading.directive);
/*Vue.prototype.$loading = Loading.service({
    background: 'rgba(0,0,0,.3)'
});*/
for (let name in components) {
    Vue.use(components[name])
}

