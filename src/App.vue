<script setup>
  import { onLaunch } from "@dcloudio/uni-app";
  import { simplifyLanguageCode, updateApp } from "@/utils/common";
  import { useBaseStore } from "@/pinia";

  const baseStore = useBaseStore();

  onLaunch(() => {
    updateApp();
    baseStore.loadUserAuth();
    //#ifdef H5
    const language = simplifyLanguageCode(navigator.language, "ja");
    baseStore.setLang(language);
    //#endif
  });
</script>

<style lang="scss">
  /*每个页面公共css */
</style>
