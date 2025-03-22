<script setup>
  import { ref } from "vue";
  const tableNum = ref(11);
  const showMore = ref(false);

  const genArray = (num) => {
    const arr = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < num; i++) {
      arr[i] = i;
    }
    return arr;
  };

  const loadMoreBox = () => {
    tableNum.value = 20;
    showMore.value = true;
  };
</script>
<template>
  <view class="container">
    <view class="top">
      <text class="top_title">桌号：07</text>
      <text class="top_tip">请选择用餐人数</text>
    </view>
    <view class="box">
      <view v-for="num in genArray(tableNum)" :key="num" class="item">
        <text>{{ num + 1 }}</text>
      </view>
      <view v-if="!showMore" class="item" @click="loadMoreBox">
        <text>更多</text>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
  .container {
    padding: 0 50px;
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
    }
  }
</style>
