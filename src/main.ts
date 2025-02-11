import Vue from 'vue';
import App from './App';
import router from './router';

import * as Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';

Vue.use(HighchartsVue, {
  highcharts: Highcharts
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');