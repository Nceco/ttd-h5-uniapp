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
