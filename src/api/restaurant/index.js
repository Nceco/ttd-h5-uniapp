import Request from "@/utils/request";
/**
 * 查询桌子上的点餐
 * @param baseBody
 * @param mid
 * @param tableNo
 * @returns
 */
export const queryTableFoodOrderApi = (baseBody, mid, tableNo) => {
  const api =
    "com.ttdtrip.api.restaurant.apis.service.v4.FoodOrderGetV4ApiService";
  const data = {
    base: baseBody,
    mid,
    tableNo
  };
  return Request.ttd(api, data);
};

/**
 * 桌子选人数
 * @param baseBody
 * @param mid
 * @param tableNo
 * @param peopleNo
 * @returns
 */
export const chooseTableFoodNumberApi = (baseBody, mid, tableNo, peopleNo) => {
  const api =
    "com.ttdtrip.api.restaurant.apis.service.v4.FoodOrderGeneraV4ApiService";
  const data = {
    base: baseBody,
    mid,
    tableNo,
    peopleNo
  };
  return Request.ttd(api, data);
};

// 获取当前订单的几个支付金额
export const getOrderPayAmountsApi = (baseBody, foodOrderId) => {
  const api =
    "com.ttdtrip.api.restaurant.apis.service.v4.GetTenValuesApiService";
  const data = {
    base: baseBody,
    foodOrderId
  };
  return Request.ttd(api, data);
};

/**
 * 支付锁
 * com.ttdtrip.api.restaurant.apis.service.v4.FlagLockApiService
 */

export const flagLockApi = (baseBody, orderId, flag) => {
  const api = "com.ttdtrip.api.restaurant.apis.service.v4.FlagLockApiService";
  const data = {
    base: baseBody,
    orderId,
    flag
  };
  return Request.ttd(api, data);
};

/**
 * 获取商品详情接口
 * @param baseBody - 基础请求体
 * @param goodsId - 商品ID
 * @returns - 返回的商品详情接口数据
 */
export const getGoodsDetailApi = (baseBody, goodsId) => {
  const api = "com.ttdtrip.api.goods.apis.GoodsDetailApiService";
  const data = {
    base: baseBody,
    gid: goodsId
  };
  return Request.ttd(api, data);
};

/**
 * 获取排队列表
 * @param baseBody - 基础请求参数
 * @param  mid - 中间参数
 * @param day - 日期参数
 * @returns- 返回的API数据
 */
export const getGoodsLineUpListApi = (baseBody, mid, day) => {
  const api = "com.ttdtrip.api.goods.apis.line.LineListApiService";
  const data = {
    base: baseBody,
    mid,
    day
  };
  return Request.ttd(api, data);
};
