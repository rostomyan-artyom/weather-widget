import Vue from 'vue';
import App from './App.vue';

import store from '@/store';
import axios from '@/initial/axios';

import '@/initial/vue-modules';

Vue.config.productionTip = false;

// mounting vue in a reserved tag
const myReservedTagsElements = document.getElementsByTagName('weather-widget');

if(myReservedTagsElements.length) {
  new Vue({
    store,
    axios,
    render: h => h(App),
  }).$mount(myReservedTagsElements[0])
}



