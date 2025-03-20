import { md5, toastDuration } from "./common";
import { baseUrl } from "@/config";

//ret_code
// 3100 重复排队触发

const sp_codes = ["3100", "3102", "3101", "3002", "500"]; // 交由页面内部自己处理的错误编码，不做全局的统一拦截

function getHeaders(headers) {
  const params = headers["X-Ca-Signature-Headers"].split(",");
  let result = "";
  for (let i = 0; i < params.length; i++) {
    const headerKey = params[i];
    result += `${headerKey}:${headers[headerKey]}\n`;
  }
  return result;
}

function getSignature(headers) {
  const Headers = getHeaders(headers);
  const Path = "/gateway/";
  const Accept = headers.Accept;
  const ContentType = headers["Content-Type"];
  const dateTime = headers.Date;
  const ContentMD5 = headers["Content-MD5"];
  const appSecret = "ttdscret";
  const stringToSign =
    "POST" +
    `\n${Accept}\n${ContentMD5}\n${ContentType}\n${dateTime}\n${
      Headers
    }${Path}`;
  return md5(stringToSign + appSecret);
}

function getSignHeader(opt) {
  const headers = {
    "Content-Type": "application/json",
    "X-Ca-Appid": "ttd1",
    "X-Ca-Version": "1.0",
    "X-Ca-Api": opt.apiName,
    "X-Ca-Timestamp": new Date().getTime(),
    "X-Ca-Nonce": "e807f1fcf82d132f9byh987bjn98", // 随便给个
    "X-Ca-Signature": "",
    "X-Ca-Signature-Headers":
      "X-Ca-Appid,X-Ca-Nonce,X-Ca-Timestamp,X-Ca-Version",
    Accept: "application/json"
  };
  const defaultOption = {
    type: "POST",
    url: baseUrl,
    data: {},
    async: true,
    timeout: 20000,
    dataType: "json"
  };
  const option = Object.assign(defaultOption, opt);
  headers["Content-MD5"] = md5(JSON.stringify(option.data));
  headers["X-Ca-Signature"] = getSignature(headers);
  return headers;
}

// 自定义一个响应拦截器处理一些公共逻辑
const beforeResponse = (res, resolve, reject) => {
  if (res.statusCode === 200) {
    if (
      !sp_codes.includes(res?.data?.ret_code) &&
      res?.data?.ret_code !== "0000"
    ) {
      // 统一的错误编码拦截
      uni.showToast({
        title: res?.data?.ret_msg || "error",
        icon: "error",
        duration: toastDuration
      });
      reject(res);
    } else {
      //成功的数据和部分sp_codes包含的数据需要resolve出去
      resolve(res?.data);
    }
  } else {
    //后端接口报类似500也返回给前端数据了。。。所以加一层promise的拦截
    if (res?.statusCode === 401 || res?.data?.status === 401) {
      // 未登录？（暂时无登录功能）
    } else {
      uni.showToast({
        title: res?.data?.error || "error",
        icon: "error",
        duration: toastDuration
      });
    }
    reject(res?.data?.error);
  }
};

const Request = (options, method = "GET") => {
  const { url, headers, ...otherConfig } = options;
  const tableNo = uni.getStorageSync("tableNo_new");
  if (tableNo) {
    otherConfig.data = {
      ...otherConfig.data,
      tableNo
    };
  }
  const baseOptions = {
    url: url.indexOf("http") !== -1 ? url : baseUrl + url,
    method,
    timeout: 20000,
    header: {
      "Content-Type": "application/json",
      ...headers
    },
    ...otherConfig
  };
  return new Promise((resolve, reject) => {
    uni
      .request(baseOptions)
      .then((res) => beforeResponse(res, resolve, reject))
      .catch((err) => {
        uni.showToast({
          title: err,
          icon: "error",
          duration: toastDuration
        });
        reject(err);
      });
  });
};

Request.ttd = (api, data = {}) =>
  Request(
    { url: "", data, headers: getSignHeader({ apiName: api, data }) },
    "POST"
  );

export default Request;
