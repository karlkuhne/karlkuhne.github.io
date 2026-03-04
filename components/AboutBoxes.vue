<script setup lang="ts">
    import { ref, computed } from 'vue';

    const { getAboutBoxesByLang } = useDatabaseOperations();
    const { locale } = useI18n();

    const AboutBoxesData = await getAboutBoxesByLang(locale.value);

    // aboutBoxes without empty objects
    const aboutBoxes = computed(() => {
        return AboutBoxesData?.map(obj => {
            return Object.fromEntries(
                Object.entries(obj).filter(([key, value]) => value !== null)
            );
        })
    })

    const getColumns = (aboutBox) => {
        return Object.entries(aboutBox)
            .filter(([key]) => key.startsWith('column'))
            .map(([_, value]) => value);
    }

    function formatNewlines(text: string): string {
        return text.replace(/(\r\n|\r|\n)/g, '<br>');
    }

    const isAboutMeVisible = ref(false);
    const isLanguagesVisible = ref(false);
    const isHobbysVisible = ref(false);
    const isDegreesVisible = ref(false);
    const isPortraitVisible = ref(false);

    const aboutMeRef = ref<HTMLElement | null>(null);
    const languagesRef = ref<HTMLElement | null>(null);
    const hobbysRef = ref<HTMLElement | null>(null);
    const degreesRef = ref<HTMLElement | null>(null);
    const portraitRef = ref<HTMLElement | null>(null);

    useFadeInOnScroll(isAboutMeVisible, aboutMeRef);
    useFadeInOnScroll(isLanguagesVisible, languagesRef);
    useFadeInOnScroll(isHobbysVisible, hobbysRef);
    useFadeInOnScroll(isDegreesVisible, degreesRef);
    useFadeInOnScroll(isPortraitVisible, portraitRef);
</script>

<template>
    <div class="flex flex-col items-center h-fit md:h-[53.2rem] lg:h-[34.75rem] transition-[height] duration-650 ease">
        <div ref="aboutMeRef"
            class="box
                translate-x-[0] translate-y-[0] w-full mx-auto mb-3
                md:w-[34rem] md:m-0
                lg:translate-x-[-2rem]"
            
            :class="`${isAboutMeVisible ? 'fade-in-visible' : 'fade-in-invisible'}`"
            id="about-me">
            <div class="pl-2 border-b-solid border-b-2 border-b-primary-70">
                <p class="ml-2 my-3">{{ aboutBoxes[0].headline }}</p>
            </div>
            <ol>
                <li v-for="(column, index) in getColumns(aboutBoxes[0])" :key="index">
                    <p v-html="formatNewlines(column)"></p>
                </li>
            </ol>
        </div>

        <div ref="languagesRef"
            class="box
                translate-x-[0] translate-y-[0] w-full mx-auto mb-3
                md:translate-x-[-9.4rem] md:translate-y-[0.8rem] md:w-fit md:m-0
                lg:translate-x-[-22.5rem] lg:translate-y-[-0.95rem]"

            :class="`${isLanguagesVisible ? 'fade-in-visible' : 'fade-in-invisible'}`" id="languages">
            <div class="pl-2 border-b-solid border-b-2 border-b-primary-70">
                <p class="ml-2 my-3">{{ aboutBoxes[1].headline }}</p>
            </div>
            <ol>
                <li v-for="(column, index) in getColumns(aboutBoxes[1])" :key="index">
                    <p v-html="formatNewlines(column)"></p>
                </li>
            </ol>
        </div>

        <div ref="hobbysRef" 
            class="box
                translate-x-[0] translate-y-[0] w-full mx-auto mb-3
                md:translate-x-[-10.2rem] md:translate-y-[1.6rem] md:w-fit md:m-0
                lg:translate-x-[-9rem] lg:translate-y-[-3rem]"
            
            :class="`${isHobbysVisible ? 'fade-in-visible' : 'fade-in-invisible'}`" id="hobbys">
            <div class="pl-2 border-b-solid border-b-2 border-b-primary-70">
                <p class="ml-2 my-3">{{ aboutBoxes[2].headline }}</p>
            </div>
            <ol>
                <li v-for="(column, index) in getColumns(aboutBoxes[2])" :key="index">
                    <p v-html="formatNewlines(column)"></p>
                </li>
            </ol>
        </div>

        <div ref="degreesRef"
            class="box pb-6
                translate-x-[0] translate-y-[0] w-full mx-auto mb-3
                md:translate-x-[4.9rem] md:translate-y-[2.5rem] md:w-fit md:m-0
                lg:translate-x-[9.4rem] lg:translate-y-[-18.4rem]"
            
            :class="`${isDegreesVisible ? 'fade-in-visible' : 'fade-in-invisible'}`" id="degrees">
            <div class="pl-2 border-b-solid border-b-2 border-b-primary-70">
                <p class="ml-2 my-3">{{ aboutBoxes[3].headline }}</p>
            </div>
            <ol>
                <li v-for="(column, index) in getColumns(aboutBoxes[3])" :key="index">
                    <p v-html="formatNewlines(column)"></p>
                </li>
            </ol>
            <a href="https://admin.karlkuhne.me/media/download/lebenslauf.pdf" target="_blank" class="primary-btn" style="margin-left: 2.5rem;">{{ $t('resume') }}</a>
        </div>

        <div ref="portraitRef"
            class="box
                translate-x-[0] translate-y-[0] w-full mx-auto mb-3
                md:translate-x-[8.3rem] md:translate-y-[-31.7rem] md:w-[17.5rem] md:m-0
                lg:translate-x-[22rem] lg:translate-y-[-47.2rem]"

            :class="`${isPortraitVisible ? 'fade-in-visible' : 'fade-in-invisible'}`" id="portrait">
            <div class="pl-2 border-b-solid border-b-2 border-b-primary-70">
                <p class="ml-2 my-3">portrait</p>
            </div>
            <NuxtImg src="https://admin.karlkuhne.me/media/download/portrait.png" alt="Portrait of Karl" class="block rounded-md selectDisable" draggable="false"
                loading="lazy" style="width: 100%; aspect-ratio: 1/1;" />
        </div>
    </div>
</template>

<style scoped>
    .box {
        transition: transform 0.65s ease, opacity 0.6s ease;
    }

    ul,
    ol {
        margin-top: 0.75rem;
        margin-bottom: 0.4rem;
        padding-right: 2rem;
    }

    ol li::marker,
    ul li::marker {
        color: grey;
        font-family: Work Sans;
        font-size: 1rem;

    }

    ol li {
        padding-bottom: 0.5rem;
    }

    ol li p {
        margin-top: 0;
        margin-bottom: 0;
    }
</style>