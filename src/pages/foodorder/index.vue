<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { queryTableFoodOrderApi } from "@/api/restaurant";
  import { useBaseStore } from "@/pinia";
  const baseInfo = useBaseStore();
  onLoad(async (options) => {
    try {
      const res = await queryTableFoodOrderApi(
        baseInfo.baseBody,
        options?.mid,
        options?.tno
      );
      console.log(res, "---dasd---dasdasdasdad");
    } catch (error) {
      console.error(error);
    }
  });
</script>
<template>
  <view>dsaf</view>
</template>
<style lang="scss"></style>
