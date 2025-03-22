import { createI18n } from "vue-i18n";
import en from "./language/en.json";
import zhCN from "./language/zh-cn.json";
import ja from "./language/ja.json";
import zhTW from "./language/zh-tw.json";
import { simplifyLanguageCode } from "@/utils/common";
import { useBaseStore } from "@/pinia";

const messages = {
  en,
  ja,
  "zh-cn": zhCN,
  "zh-tw": zhTW
};

export const initLangConfig = (app, lang) => {
  const language = simplifyLanguageCode(lang, "ja");
  const baseStore = useBaseStore();
  baseStore.setLang(language);
  app.use(
    createI18n({
      legacy: false,
      locale: language,
      messages
    })
  );
};
