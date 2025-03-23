<script setup>
  import { ref } from "vue";
  const alertDialog = ref(null);
  const emit = defineEmits(["confirm", "close"]);
  defineProps({
    msgType: {
      type: String,
      default: "info"
    },
    cancelText: {
      type: String,
      default: "common.dialogCancelTxt"
    },
    confirmText: {
      type: String,
      default: "common.dialogConfirmTxt"
    },
    title: {
      type: String,
      default: "common.tips"
    },
    content: {
      type: String,
      default: "欢迎使用 uni-popup!"
    },
    showClose: {
      type: Boolean,
      default: true
    }
  });
  const dialogClose = () => emit("close");
  const dialogConfirm = () => emit("confirm");
  const open = () => alertDialog.value.open();

  defineExpose({
    open
  });
</script>
<template>
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      :type="msgType"
      :cancel-text="$t(`${cancelText}`)"
      :confirm-text="$t(`${confirmText}`)"
      :title="$t(`${title}`)"
      :content="content"
      :show-close="showClose"
      @confirm="dialogConfirm"
      @close="dialogClose"
    >
      <slot name="dialogContent"></slot>
    </uni-popup-dialog>
  </uni-popup>
</template>
<style scoped lang="scss">
  ::v-deep .uni-dialog-title-text {
    color: #333;
    font-weight: 500;
  }
  ::v-deep .uni-dialog-button-text {
    color: $uni-color-primary;
  }
  ::v-deep .uni-dialog-content {
    text-align: center;
  }
</style>
