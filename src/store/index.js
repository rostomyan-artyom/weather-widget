import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import widget from '@/store/widget';

export default new Vuex.Store({
  modules: {
    widget,
  },
});
