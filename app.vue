<template>
  <div id="__nuxt">
    <Header />
    <div class="main-content">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
    <Footer />
  </div>

  <Lightbox v-if="lightbox.isVisible" />
</template>

<script setup lang="ts">
  import Header from '~/components/Header.vue';
  import Footer from '~/components/Footer.vue';

  /* lightbox */
  import { useLightboxStore } from '~/stores/lightboxStore';
  import Lightbox from '~/components/Lightbox.vue';
  const lightbox = useLightboxStore();
</script>

<style scoped>

  #__nuxt {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex-grow: 1;
    margin-top: 4rem;
  }
</style>