<script setup>
  defineProps({
    text: {
      type: String,
      default: "default"
    },
    width: {
      type: String,
      default: "300px"
    },
    radius: {
      type: String,
      default: "0px"
    }
  });
  const emits = defineEmits(["handleClick"]);
</script>
<template>
  <view>
    <button
      :style="{ width, borderRadius: radius ? `${radius}` : '3px' }"
      @click="() => emits('handleClick')"
    >
      {{ text }}
    </button>
  </view>
</template>
<style lang="scss" scoped>
  button {
    background-color: $uni-color-primary;
    color: #fff;
    border-radius: 30px;
  }
</style>
