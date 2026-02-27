<script lang="ts" setup>

</script>

<template>
  <div class="loader border-solid border-10 border-primary-70 border-t-transparent rounded-full w-12 h-12" />
</template>

<style scoped>
  .loader {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>