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
    <div id="container" class="h-fit md:h-[53.7rem] xl:h-[34.75rem]">
        <div ref="aboutMeRef"
            class="box
                translate-x-[0] translate-y-[0] w-[calc(100vw-2rem)] mx-auto mb-3
                md:w-[34rem] md:m-0
                xl:translate-x-[-2rem]"
            
            :class="`${isAboutMeVisible ? 'fade-in-visible' : 'fade-in-invisible'}`"
            id="about-me">
            <div class="label">
                <p>{{ aboutBoxes[0].headline }}</p>
            </div>
            <ol>
                <li v-for="(column, index) in getColumns(aboutBoxes[0])" :key="index">
                    <p v-html="formatNewlines(column)"></p>
                </li>
            </ol>
        </div>

        <div ref="languagesRef"
            class="box aboutBox
                translate-x-[0] translate-y-[0] w-[calc(100vw-6rem)] mx-auto mb-3
                md:translate-x-[-9.4rem] md:translate-y-[-0.7rem] md:w-fit md:m-0
                xl:translate-x-[-22.5rem] xl:translate-y-[-0.95rem]"

            :class="`${isLanguagesVisible ? 'fade-in-visible' : 'fade-in-invisible'}`" id="languages">
            <div class="label">
                <p>{{ aboutBoxes[1].headline }}</p>
            </div>
            <ol>
                <li v-for="(column, index) in getColumns(aboutBoxes[1])" :key="index">
                    <p v-html="formatNewlines(column)"></p>
                </li>
            </ol>
        </div>

        <div ref="hobbysRef" 
            class="box aboutBox
                translate-x-[0] translate-y-[0] w-[calc(100vw-6rem)] mx-auto mb-3
                md:translate-x-[-10.4rem] md:translate-y-[1.4rem] md:w-fit md:m-0
                xl:translate-x-[-9rem] xl:translate-y-[-3rem]"
            
            :class="`${isHobbysVisible ? 'fade-in-visible' : 'fade-in-invisible'}`" id="hobbys">
            <div class="label">
                <p>{{ aboutBoxes[2].headline }}</p>
            </div>
            <ol>
                <li v-for="(column, index) in getColumns(aboutBoxes[2])" :key="index">
                    <p v-html="formatNewlines(column)"></p>
                </li>
            </ol>
        </div>

        <div ref="degreesRef"
            class="box aboutBox pb-6
                translate-x-[0] translate-y-[0] w-[calc(100vw-2rem)] mx-auto mb-3
                md:translate-x-[4.7rem] md:translate-y-[3.2rem] md:w-fit md:m-0
                xl:translate-x-[9.4rem] xl:translate-y-[-18.4rem]"
            
            :class="`${isDegreesVisible ? 'fade-in-visible' : 'fade-in-invisible'}`" id="degrees">
            <div class="label">
                <p>{{ aboutBoxes[3].headline }}</p>
            </div>
            <ol>
                <li v-for="(column, index) in getColumns(aboutBoxes[3])" :key="index">
                    <p v-html="formatNewlines(column)"></p>
                </li>
            </ol>
            <a href="/Lebenslauf.pdf" download target="_blank" class="blue-button" style="margin-left: 2.5rem;">{{
                $t('resume') }}</a>
        </div>

        <div ref="portraitRef"
            class="box aboutBox
                translate-x-[0] translate-y-[0] w-[calc(100vw-6rem)] mx-auto mb-3
                md:translate-x-[8.3rem] md:translate-y-[-30.8rem] md:w-[17.5rem] md:m-0
                xl:translate-x-[22rem] xl:translate-y-[-47.2rem]"

            :class="`${isPortraitVisible ? 'fade-in-visible' : 'fade-in-invisible'}`" id="portrait">
            <div class="label">
                <p>portrait</p>
            </div>
            <NuxtImg src="/img/Portrait.avif" alt="Portrait of Karl" class="selectDisable" draggable="false"
                loading="lazy" style="width: 100%; aspect-ratio: 1/1;" />
        </div>
    </div>
</template>

<style scoped>

    #container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 35.8rem;
    }

    .box {
        transition: transform 0.5s ease-out, opacity 0.5s;
    }

    .label {
        border-bottom: var(--border);
        padding-left: 0.5rem;
    }

    .label p {
        padding-left: 0.5rem;
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;
    }

    /* LIST */

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

    /* POSITIONS + WIDTH */


    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
        #degrees {
            transform: translateX(9.4rem) translateY(-19.7rem);
        }
    }
</style>