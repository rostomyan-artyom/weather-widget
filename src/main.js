import Vue from 'vue';
import App from './App.vue';

import axios from '@/initial/axios';

import '@/initial/vue-modules';

Vue.config.productionTip = false;

new Vue({
  axios,
  render: h => h(App),
}).$mount('#app')
