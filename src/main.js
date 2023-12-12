import { createApp } from 'vue';
import 'ant-design-vue/dist/reset.css';
import './style.less';
import router from './router';
import Antd from 'ant-design-vue';
import App from './App.vue';
import * as echarts from 'echarts';
import defaultTheme from '@/config/theme/default.json';
import CardTitle from '@/components/card-title.vue';
import '@/assets/index.css'
import HuaRunHeader from '@/components/HuaRunHeader.vue'
import MainHeader from '@/components/MainHeader.vue'

const app = createApp(App);

echarts.registerTheme('default', defaultTheme);
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$echartsThemes = {
    default: defaultTheme,
};
app.component('CardTitle', CardTitle);
app.component('huarun-header',HuaRunHeader);
app.component('MainHeader',MainHeader);
app.use(router).use(Antd);
app.mount('#app')
