import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
const app = createApp(App);
//注册pinia
const pinia = createPinia();
app.use(pinia);
app.mount("#app");
