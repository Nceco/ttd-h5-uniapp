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
