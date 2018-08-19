import Vue from "vue";
import Layout from "./theme/Layout.vue";

const app = new Vue({
  el: "#app",
  ...Layout
});

export { app };
