<script setup>
  import { reactive, ref } from "vue";
  import TButton from "@/components/TTDButton.vue";
  import { toastDuration } from "@/utils/common";
  import { useI18n } from "vue-i18n";
  import { onLoad } from "@dcloudio/uni-app";
  import { chooseTableFoodNumberApi } from "@/api/restaurant";
  import { useBaseStore } from "@/pinia";
  const baseInfo = useBaseStore();
  const { t } = useI18n();
  const tableNum = ref(11);
  const showMore = ref(false);
  const checked = ref(-1);
  const tableInfoRef = reactive({
    tno: "",
    mid: ""
  });

  onLoad((options) => {
    if (!options.tno || !options.mid) {
      uni.showToast({
        title: "tno or mid is needed",
        icon: "error",
        duration: toastDuration
      });
      return;
    }
    uni.setStorageSync(`${options.mid}_tno`, options.tno);
    tableInfoRef.tno = options.tno;
    tableInfoRef.mid = options.mid;
  });

  const genArray = (num) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr[i] = i;
    }
    return arr;
  };

  const handleChecked = (index) => (checked.value = index);

  const loadMoreBox = () => {
    tableNum.value = 20;
    showMore.value = true;
  };

  const handelConfirm = async () => {
    uni.showLoading();
    if (checked.value < 0) {
      uni.showToast({
        title: t("common.pcds"),
        icon: "none",
        duration: toastDuration
      });
      return;
    }
    //跳转对应的首页
    try {
      const peopleNo = Number(checked.value) + 1;
      const res = await chooseTableFoodNumberApi(
        baseInfo.baseBody,
        tableInfoRef.mid,
        tableInfoRef.tno,
        peopleNo
      );
      if (res.ret_code === "0000") {
        uni.reLaunch({
          url: `/pages/foodHome/index?mid=${tableInfoRef.mid}&tno=${tableInfoRef.tno}&personNum=${peopleNo}&orderId=${res.foodOrderId}`
        });
      }
      uni.hideLoading();
    } catch (e) {
      console.error(e);
      checked.value = -1;
    }
  };
</script>
<template>
  <view class="container">
    <view class="top">
      <text class="top_title"
        >{{ $t("common.tableNumber") }}：{{
          tableInfoRef.tno || $t("common.nothing")
        }}</text
      >
      <text class="top_tip">{{ $t("common.pcds") }}</text>
    </view>
    <view class="box">
      <view
        v-for="num in genArray(tableNum)"
        :key="num"
        :class="{ item: true, checkedItem: checked === num }"
        @click="() => handleChecked(num)"
      >
        <text>{{ num + 1 }}</text>
      </view>
      <view v-if="!showMore" class="item" @click="loadMoreBox">
        <text>{{ $t("common.more") }}</text>
      </view>
    </view>
    <view class="bottom">
      <TButton :text="$t('common.confirm')" @handle-click="handelConfirm" />
    </view>
  </view>
</template>
<style lang="scss" scoped>
  .container {
    padding: 0 25px;
    box-sizing: border-box;
    .top {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 33px;
      &_title {
        color: $uni-color-primary;
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 39px;
      }
      &_tip {
        font-size: 18px;
        margin-bottom: 26px;
      }
    }
    .box {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 75px;
        height: 55px;
        margin-bottom: 16px;
        font-size: 18px;
        line-height: 55px;
        color: #3c3c3c;
        text-align: center;
        border: 1px solid #b1b1b1;
        border-radius: 4px;
        box-sizing: border-box;
      }
      .checkedItem {
        border-width: 0;
        background-color: $uni-color-primary;
        color: #fff;
      }
    }
    .bottom {
      margin-top: 20px;
    }
  }
</style>
