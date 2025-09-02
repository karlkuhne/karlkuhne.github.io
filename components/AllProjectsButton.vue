<template>
    <div style="display: flex; justify-content: center;">
        <NuxtLink :to="localePath('/projekt-galerie')" class="all-projects-button selectDisable">
            <span>{{ $t('all_projects_button') }}</span>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="17" width="17"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                </path>
            </svg>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
    const localePath = useLocalePath()
</script>

<style scoped>
    .all-projects-button {
        display: inline-flex;
        position: relative;
        align-items: center;
        overflow: hidden;

        width: 8.7rem;
        padding: 1rem 1.5rem 1rem 1.5rem;

        background-color: rgb(11, 102, 194);
        border: none;
        border-radius: 1.5rem;

        font-family: Work Sans;
        font-size: 1rem;
        color: white;
        text-decoration: none;

        transition: background-color 0.15s, width 0.3s ease;
    }

    .all-projects-button:hover {
        width: 9.7rem;
        background-color: rgb(5, 79, 155);
        cursor: pointer;
    }

    .all-projects-button span {
        transition: transform 0.3s ease;
    }

    .all-projects-button:hover span {
        transform: translateX(-0.3rem);
    }

    .all-projects-button svg {
        transition: transform 0.3s ease;
        margin-left: 10px;
    }

    .all-projects-button:hover svg {
        transform: translateX(1rem);
    }
</style>