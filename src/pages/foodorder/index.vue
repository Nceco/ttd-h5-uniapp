<script setup>
  import { reactive } from "vue";
  import { onLoad } from "@dcloudio/uni-app";
  import { queryTableFoodOrderApi } from "@/api/restaurant";
  import { useBaseStore } from "@/pinia";
  const baseInfo = useBaseStore();
  //当前扫码进来的桌子信息
  const currentTableInfo = reactive({
    mid: "",
    tno: "",
    foodOrderId: "",
    consumerCount: 0
  });

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
      const res = await queryTableFoodOrderApi(
        baseInfo.baseBody,
        currentTableInfo?.mid,
        currentTableInfo?.tno
      );
      if (res.ret_code === "0000") {
        // 请求成功
      } else if (res.ret_code === "3100") {
        // 桌子被清理了（跳转到选择人数的页面）
        uni.reLaunch({
          url: `/pages/chooseDiners/index?mid=${currentTableInfo.mid}&tno=${currentTableInfo.tno}`
        });
      }
      uni.hideLoading();
    } catch (error) {
      console.error(error);
    }
  };
</script>
<template>
  <view>dsaf</view>
</template>
<style lang="scss"></style>
