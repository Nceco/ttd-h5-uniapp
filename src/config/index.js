const env = process.env.NODE_ENV || "development";

const baseConfig = {
  appId: "wxc1f26b016e71925a",
  scope: "zmn-rx-oms-wx-api"
};

const config = {
  development: {
    ...baseConfig,
    baseUrl: "https://ttdapi.appland.com.cn/gateway",
    wsUrl: "https://ttdapi.appland.com.cn/wsfoodmsg",
    wsGateway: "https://ttdapi.appland.com.cn/wsgateway",
    lineBackUrl: "https://ttdapi.appland.com.cn/line/login/callback"
  },
  sit: {
    ...baseConfig,
    baseUrl: "https://ttdapi.appland.com.cn/gateway",
    wsUrl: "https://ttdapi.appland.com.cn/wsfoodmsg",
    wsGateway: "https://ttdapi.appland.com.cn/wsgateway",
    lineBackUrl: "http://172.31.113.135:10086/lineback.html"
  },
  production: {
    ...baseConfig,
    baseUrl: "https://ttdapi.appland.com.cn/gateway",
    wsUrl: "https://ttdapi.appland.com.cn/wsfoodmsg",
    wsGateway: "https://ttdapi.appland.com.cn/wsgateway",
    lineBackUrl: "https://ttdapi.appland.com.cn/line/login/callback"
  }
};

// const T = useI18nNoHook()
//
// export const appId = config[env].appId;
// export const scope = config[env].scope;
export const baseUrl = config[env].baseUrl;
// export const wsUrl = config[env].wsUrl;
// export const wsGateway = config[env].wsGateway;
// export const lineBackUrl = config[env].lineBackUrl;
// export const bookEvents = [{ label: T('queueHeader.commonOrder'), value: 'yuding' }, { label: T('queueHeader.commonConfirm'), value: 'confirm' }, { label: T('queueHeader.commonComplete'), value: 'finish' }];
//
// export const SMOKE_OPTIONS = [
//     {
//         label: T('queue.bookSmoking'),
//         value: 1,
//     },
//     {
//         label: T('queue.bookNoSmoking'),
//         value: 0,
//     },
//     {
//         label: T('queue.bookNeverMind'),
//         value: -1,
//     },
// ];
//
// export const BOX_OPTIONS = [{
//     label: T('queue.queueNeed'),
//     value: 1,
// },
//     {
//         label: T('queue.queueNoNeed'),
//         value: 0,
//     },
//     {
//         label: T('queue.bookNeverMind'),
//         value: -1,
//     },];
//
// export default {
//     ...config[env],
// };
