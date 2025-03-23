<script setup>
  import { reactive, ref } from "vue";
  import { onLoad } from "@dcloudio/uni-app";
  import {
    queryTableFoodOrderApi,
    getOrderPayAmountsApi,
    flagLockApi
  } from "@/api/restaurant";
  import { useBaseStore } from "@/pinia";
  import { generatePayFlag, toastDuration } from "@/utils/common";
  import TTDDialog from "@/components/TTDDialog";
  const baseInfo = useBaseStore();
  //当前扫码进来的桌子信息
  const currentTableInfo = reactive({
    mid: "",
    tno: "",
    foodOrderId: "",
    consumerCount: 0
  });

  const ttdDialogRef = ref(null);

  onLoad(async (options) => {
    uni.showLoading();
    currentTableInfo.mid = options.mid;
    currentTableInfo.tno = options.tno;
    currentTableInfo.foodOrderId = options.foodOrderId;
    currentTableInfo.consumerCount = parseInt(options.personNum, 10);
    await initData();
  });

  const initData = async () => {
    try {
      await handleScanCodeEnter();
    } catch (error) {
      console.error(error);
      uni.hideLoading();
    }
  };

  const handleScanCodeEnter = async () => {
    uni.setStorageSync("tableNo_new", currentTableInfo.tno);
    uni.setStorageSync(`${currentTableInfo.mid}_tno`, currentTableInfo.tno);
    try {
      const res = await queryTableFoodOrderApi(
        baseInfo.baseBody,
        currentTableInfo?.mid,
        currentTableInfo?.tno
      );
      if (res.ret_code === "0000") {
        currentTableInfo.foodOrderId = res.foodOrderId;
        //获取当前订单的几个支付金额
        const ret = await getOrderPayAmountsApi(
          baseInfo.baseBody,
          res?.foodOrderId
        );
        if (ret?.ret_code === "0000" && ret?.result?.unPayAmounts > 0) {
          // ttdDialogRef.current?.showDialog()
          ttdDialogRef.value?.open && ttdDialogRef.value.open();
        } else {
          uni.reLaunch({
            url: `/pages/foodHome/index?mid=${currentTableInfo.mid}&tno=${currentTableInfo.tno}&personNum=${currentTableInfo.consumerCount}&orderId=${currentTableInfo.foodOrderId}`
          });
        }
      } else if (res.ret_code === "3100") {
        // 桌子被清理了（跳转到选择人数的页面）
        uni.reLaunch({
          url: `/pages/chooseDiners/index?mid=${currentTableInfo.mid}&tno=${currentTableInfo.tno}`
        });
      }
      uni.hideLoading();
    } catch (error) {
      console.error(error);
      uni.hideLoading();
    }
  };

  const getPayFlag = async () => {
    let canPayResult = "";
    let flag = generatePayFlag(currentTableInfo.mid);
    try {
      const res = await flagLockApi(
        baseInfo.baseBody,
        currentTableInfo.foodOrderId,
        flag
      );
      if (res.result?.code !== undefined && !res?.result?.data?.result) {
        uni.showToast({
          title: res?.result?.data?.message,
          icon: "loading",
          duration: toastDuration
        });
        setTimeout(() => {
          uni.reLaunch({
            url: `/pages/foodHome/index?mid=${currentTableInfo.mid}&tno=${currentTableInfo.tno}&personNum=${currentTableInfo.consumerCount}&orderId=${currentTableInfo.foodOrderId}`
          });
        }, 1000);
        return undefined;
      }
      uni.setStorageSync(
        `${currentTableInfo.mid}_payFlag`,
        res?.result?.data?.flag
      );
      canPayResult = res?.result?.data?.flag;
    } catch (error) {
      console.error(error);
    }
    return canPayResult;
  };

  const noPayConfirm = async () => {
    const canPay = await getPayFlag();
    if (canPay) {
      uni.reLaunch({
        url: `/pages/chooseFoods/index?orderId=${currentTableInfo.foodOrderId}&mid=${currentTableInfo.mid}&tno=${currentTableInfo.tno}`
      });
    }
  };
</script>
<template>
  <view>
    <TTDDialog ref="ttdDialogRef" :show-close="false" @confirm="noPayConfirm">
      <template #dialogContent>
        <view>
          <view style="color: #646566; font-size: 15px">{{
            $t("common.noPayTip1")
          }}</view>
          <view style="color: #646566; font-size: 15px; font-weight: bold">{{
            $t("common.noPayTip2")
          }}</view>
        </view>
      </template>
    </TTDDialog>
  </view>
</template>
<style lang="scss"></style>
