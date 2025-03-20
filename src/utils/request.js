import { md5 } from "./common";
import { baseUrl } from "../config";

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

uni.addInterceptor("request", {});

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
  return uni.request(baseOptions);
};

Request.ttd = (api, data = {}) =>
  Request(
    { url: "", data, headers: getSignHeader({ apiName: api, data }) },
    "POST"
  );

export default Request;
