import Vue from "vue";
import App from "./src/App.vue";

import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
Vue.use(Vuetify);

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

Vue.config.ignoredElements = ["lottie-player"];

new Vue({
  el: "#app",
  render: (h) => h(App),
  vuetify: new Vuetify({
    theme: {
      dark: localStorage.getItem('darkModeEnabled') ? true : false,
    },
  }),
});