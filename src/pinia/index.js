import { defineStore } from "pinia";

export const useBaseStore = defineStore("baseState", {
  state: () => {
    return {
      baseBody: {
        language: "ja",
        lat: 0,
        lng: 0,
        currency: "円",
        auth: "gWxbNvHRFsyULYU/qmn8RrfURLgrJry7mpKOpJEzkgU=.Qiro41CA+7+2Yf99QkwxpaE+mFrFNDSdgRJEBl+YRAWhI3lZMFsMP9AYfOFgxdpaYf0mv5vd6gUCaShGvJlIBMyg+G8dO7DzoG0heU949cyTE8MddZzbexLbmlBaazBwAyUzwO6RIBA=.948a21350c31362f05cbedd7e616f88d0bd66dbd",
        myUid: "c88699f9-be42-4495-9e2e-38f51668e438"
      },
      openId: "",
      cityName: "日本",
      language: "ja"
    };
  },
  actions: {
    //设置当前语音
    setLang(language) {
      this.baseBody.language = language;
      this.language = language;
    },
    loadUserAuth() {
      // 加载本地存储
      const storageAuthority = uni.getStorageSync("authority");
      const storageUser = uni.getStorageSync("user");
      if (storageAuthority && storageUser) {
        this.baseBody.auth = storageAuthority.auth;
        this.openId = storageAuthority.openId;
        this.userInfo = storageUser;
        this.baseBody.myUid = storageAuthority.myUid;
      } else {
        this.baseBody.auth = "";
        this.openId = "";
        this.userInfo = undefined;
        this.baseBody.myUid = "";
        uni.removeStorageSync("user");
        uni.removeStorageSync("authority");
      }
    },
    setAuthInfo(data) {
      this.baseBody.auth = data.auth;
      this.openId = data.openId;
      this.userInfo = data.userInfo;
      this.baseBody.myUid = data.myUid;
    }
  }
});
