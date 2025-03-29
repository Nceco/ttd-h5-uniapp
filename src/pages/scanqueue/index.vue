<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { reactive } from "vue";
  import { getGoodsDetailApi, getGoodsLineUpListApi } from "@/api/restaurant";
  import { useBaseStore } from "@/pinia";
  const baseInfo = useBaseStore();
  const goodInfo = reactive({
    goods: undefined,
    imgUrls: []
  });

  // const baseInfo = reactive({
  //     mid: '',
  //     gid: ''
  // })

  onLoad(async (options) => {
    uni.showLoading();
    console.log(options);
    // baseInfo.gid = options.gid
    // baseInfo.mid = options.mid
    await getGoodDetail(options.gid);
    await getGoodLineCount(options.mid);
    uni.hideLoading();
  });

  const getGoodDetail = async (gid) => {
    try {
      const res = await getGoodsDetailApi(baseInfo.baseBody, gid);
      if (res.ret_code === "0000") {
        goodInfo.goods = res.goodsVO;
        goodInfo.imgUrls = res.goodsVO.goodsBase.pics || [];
      }
    } catch (e) {
      console.error(e);
      uni.hideLoading();
    }
  };

  const getGoodLineCount = async (mid) => {
    const date = new Date();
    const dateStrYYYYMMDD = `${date.getFullYear().toString().padStart(4, "0")}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
    try {
      const res = await getGoodsLineUpListApi(
        baseInfo.baseBody,
        mid,
        dateStrYYYYMMDD
      );
      if (res.ret_code === "0000") {
        const uid = (uni.getStorageSync(`${mid}_user`) || {}).uid;
        const current_lineInfo = res.lines.find(
          (item) =>
            item.lineStatus === 1 && item.uid === uid && item.mid === mid
        );
        // 如果存在自己排的队号
        if (current_lineInfo.sn) {
          uni.setStorageSync(`${mid}_lineSn`, current_lineInfo.sn);
        }
        //处理
      }
    } catch (e) {
      console.error(e);
      uni.hideLoading();
    }
  };
</script>
<template>
  <view class="container">
    <img :src="goodInfo?.goods?.goodsBase?.poster" />
  </view>
</template>
<style lang="scss" scoped>
  .container {
    img {
      width: 100%;
      height: 330px;
    }
  }
</style>
