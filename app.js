import Vue from "vue";
import App from "./src/App.vue";

import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";

Vue.use(Vuetify);

new Vue({
  el: "#app",
  render: (h) => h(App),
  vuetify: new Vuetify(),
});
