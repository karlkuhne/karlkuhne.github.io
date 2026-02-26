<script setup lang="ts">
    const localePath = useLocalePath()
</script>

<template>
    <div style="display: flex; justify-content: center;">
        <NuxtLink :to="localePath('/projekt-galerie')"
            class="primary-btn flex items-center w-[8.7rem] hover:w-[9.7rem] transition-all duration-300 ease py-4 px-6 rounded-[1.5rem] cursor-pointer selectDisable group">
            <span>{{ $t('all_projects_button') }}</span>
            <svg class="transition-transform duration-300 ease group-hover:translate-x-[1rem] ml-2.5"
                stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="17" width="17" cxmlns="http://www.w3.org/2000/svg">
                <path
                    d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                </path>
            </svg>
        </NuxtLink>
    </div>
</template>