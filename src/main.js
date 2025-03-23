import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import { initLangConfig } from "@/locales";
import App from "./App.vue";
import { updateApp } from "@/utils/common";
const pinia = createPinia();
updateApp();
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  //初始化国际化
  initLangConfig(app, navigator.language || "ja");
  return {
    app
  };
}
