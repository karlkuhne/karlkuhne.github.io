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

<template>
  <div class="relative w-fit h-fit flex bg-primary-70 rounded-md p-1">
    <div class="absolute top-0 bottom-0 bg-primary-70 rounded-md" :style="highlightStyle" />

    <button v-for="(lang, index) in languages" :key="lang.code" class="flex gap-1.5" @click="changeLanguage(lang.code, index)"
      ref="tabRefs"> <span class="icon">{{ lang.icon }}</span> {{ lang.label }} </button>
  </div>
</template>