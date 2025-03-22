<script setup>
  import { onLaunch } from "@dcloudio/uni-app";
  import { useBaseStore } from "@/pinia";

  const baseStore = useBaseStore();

  onLaunch(() => {
    baseStore.loadUserAuth();
  });
</script>

<style lang="scss">
  /*每个页面公共css */
</style>
