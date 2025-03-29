<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import TButton from "@/components/TTDButton.vue";
  import { reactive } from "vue";
  import { getGoodsDetailApi, getGoodsLineUpListApi } from "@/api/restaurant";
  import { useBaseStore } from "@/pinia";
  import { getSupportedLanguage } from "@/utils/common";
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
      console.log(goodInfo, "--ds--");
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
        if (current_lineInfo?.sn) {
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
    <view class="content">
      <view v-if="goodInfo?.goods?.goodsInfo.info">
        <text>{{ $t("queue.restaurantInfo") }}</text>
        <view v-html="goodInfo.goods.goodsInfo.info"></view>
      </view>
      <view v-if="goodInfo?.goods" class="main_info">
        <!-- 开放时间 -->
        <view v-if="goodInfo.goods?.goodsInfo?.openTime" class="main_info_item">
          <text
            >{{ $t("queue.openTime") }}：{{
              goodInfo.goods.goodsInfo.openTime
            }}</text
          >
        </view>
        <!-- 时间 -->
        <view v-if="goodInfo.goods?.goodsInfo?.playTime" class="main_info_item">
          <text
            >{{ $t("queue.playTime") }}：{{
              goodInfo.goods.goodsInfo.playTime
            }}</text
          >
        </view>
        <!-- 手机号 -->
        <view v-if="goodInfo.goods?.goodsBase?.phone" class="main_info_item">
          <text
            >{{ $t("queue.phone") }}：{{ goodInfo.goods.goodsBase.phone }}</text
          >
        </view>
        <!-- 邮箱 -->
        <view v-if="goodInfo.goods?.goodsBase?.email" class="main_info_item">
          <text
            >{{ $t("queue.email") }}：{{ goodInfo.goods.goodsBase.email }}</text
          >
        </view>
        <!-- 传真号 -->
        <view v-if="goodInfo.goods?.goodsBase?.fax" class="main_info_item">
          <text>{{ $t("queue.fax") }}：{{ goodInfo.goods.goodsBase.fax }}</text>
        </view>
        <!-- 语言 -->
        <view
          v-if="goodInfo.goods?.goodsInfo?.supportedLanguage?.length > 0"
          class="main_info_item"
        >
          <text
            >{{ $t("queue.supportLang") }}：{{
              getSupportedLanguage(goodInfo.goods.goodsInfo.supportedLanguage)
            }}</text
          >
        </view>
      </view>
      <view
        v-if="goodInfo?.goods?.goodsBase?.lineUp === 1"
        class="mian_info_bottom"
      >
        <text>{{ $t("queue.currentLineCount") }}：{{ 0 }}</text>
      </view>
      <view
        v-if="goodInfo?.goods?.goodsBase?.lineUp !== 1"
        class="mian_info_bottom"
      >
        <text>{{ $t("queue.offline") }}</text>
      </view>
      <TButton :text="$t('common.que')" width="100%" radius="2px" />
    </view>
  </view>
</template>
<style lang="scss" scoped>
  .container {
    img {
      width: 100%;
      height: 365px;
    }
    .content {
      padding: 0 1.2rem;
      .main_info {
        padding: 1rem 0;
        border-bottom: 0.025rem solid #e5e5e5;
        &_item:not(:last-child) {
          margin-bottom: 1rem;
          color: $uni-text-color;
          font-size: 1rem;
        }
      }
      .mian_info_bottom {
        padding: 1rem 0;
        color: $uni-text-color;
        font-size: 1rem;
        font-weight: bold;
      }
    }
  }
</style>
