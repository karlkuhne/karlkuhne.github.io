<script lang="ts" setup>

</script>

<template>
  <div class="loader" />
</template>

<style scoped>
  .loader {
    border: 0.5rem solid var(--border-color);
    border-top: 0.5rem solid rgb(175, 175, 175);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
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