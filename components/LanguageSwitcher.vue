<template>
  <div class="switcher">
    <div class="highlight" :style="highlightStyle" />

    <button v-for="(lang, index) in languages" :key="lang.code" class="tab" @click="changeLanguage(lang.code, index)"
      ref="tabRefs"> <span class="icon">{{ lang.icon }}</span> {{ lang.label }} </button>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const languages = [
    { code: 'de', label: 'DE', icon: '🇩🇪' },
    { code: 'en', label: 'EN', icon: '🇬🇧' },
    { code: 'sv', label: 'SV', icon: '🇸🇪' }
  ]
  const { locale, setLocale } = useI18n()
  const activeIndex = ref(languages.findIndex((lang) => lang.code === locale.value) || 0)
  const tabRefs = ref([])

  const highlightStyle = computed(() => {
    const el = tabRefs.value[activeIndex.value]
    if (el) {
      return {
        width: `${el.offsetWidth}px`,
        left: `${el.offsetLeft}px`,
      }
    }
    return {
      width: '0px',
      left: '0px',
    }
  })

  function changeLanguage(code, index) {
    setLocale(code)
    activeIndex.value = index
  }
</script>

<style scoped>
  .switcher {
    position: relative;
    width: fit-content;
    height: fit-content;
    display: flex;
    background-color: rgb(50, 50, 50);
    border-radius: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .highlight {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: rgb(70, 70, 70);
    border-radius: 0.5rem;
  }

  .tab {
    z-index: 1;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .icon,
  .tab {
    font-size: 1rem;
  }
</style>