import CryptoJS from "crypto-js";

export const md5 = (data) => {
  if (!data) {
    return "";
  }
  try {
    if (typeof data === "string") {
      return CryptoJS.MD5(data).toString();
    }
    return CryptoJS.MD5(JSON.stringify(data)).toString();
  } catch (err) {
    return "err_md5";
  }
};

//兼容匹配当前语音
export function simplifyLanguageCode(languageCode, def) {
  // 将语言代码转为小写，以确保匹配不受大小写影响
  const lowerCaseCode = languageCode.toLowerCase();

  // 根据语言代码返回简化代码
  if (lowerCaseCode.startsWith("ja")) {
    return "ja"; // 日文
  }
  if (lowerCaseCode.startsWith("zh")) {
    if (lowerCaseCode === "zh-cn") {
      return "zh-cn"; // 大陆简体中文
    }
    if (
      lowerCaseCode === "zh-tw" ||
      lowerCaseCode === "zh-hk" ||
      lowerCaseCode === "zh-mo"
    ) {
      return "zh-tw"; // 繁体中文
    }
    // 对于其他中文，可以根据需要返回不同的简化代码
    return "zh-cn";
  }
  if (lowerCaseCode.startsWith("en")) {
    return "en"; // 英文
  }
  // 如果没有匹配到特定的语言，可以返回一个默认值或者原始的语言代码
  return def;
}

export const navigateBack = (options) => {
  const option = { ...{ delta: 1 }, ...options };
  if (process.env.UNI_PLATFORM === "h5") {
    // 兼容浏览器刷新后taro路由栈清空的问题
    history.go(-option.delta);
  } else {
    uni.navigateBack(options);
  }
};

// 每次打包发版调用一次，清空旧数据
export function updateApp() {
  // 模拟版本更新
  const app_version = uni.getStorageSync("app_version");
  if (app_version !== "0.0.1") {
    //清空本地缓存
    localStorage.clear();
    uni.setStorageSync("app_version", "0.0.1");
  }
}

// toast默认duration
export const toastDuration = 4000;

export const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxX".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 160) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 生成一个支付标志flag
export const generatePayFlag = (mid) => {
  let flag = uni.getStorageSync(`${mid}_canPayFlag`);
  if (!flag) {
    flag = guid();
    uni.setStorageSync(`${mid}_canPayFlag`, flag);
  }
  return flag;
};

export const getSupportedLanguage = (language) => {
  return language.reduce((pre, curr) => {
    return `${pre}/${curr}`;
  });
};
