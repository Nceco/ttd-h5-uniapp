<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area" @click="handleClick">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {},
    methods: {
      handleClick() {
        uni.navigateTo({
          url: "/pages/foodorder/index?mid=84a2175d-8063-425b-b290-c915ac11f959&tno=07"
        });
      }
    }
  };
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
