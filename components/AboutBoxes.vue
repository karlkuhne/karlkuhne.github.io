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
    <div id="container">
        <div ref="aboutMeRef" class="box" :class="`${isAboutMeVisible ? 'fade-in-visible' : 'fade-in-invisible'}`"
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

        <div ref="languagesRef" class="box aboutBox"
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

        <div ref="hobbysRef" class="box aboutBox"
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

        <div ref="degreesRef" class="box aboutBox"
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

        <div ref="portraitRef" class="box aboutBox"
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

    #about-me {
        transform: translateX(-2rem);
        width: 34rem;
    }

    #portrait {
        width: 17.5rem;
        transform: translateX(22rem) translateY(-47.2rem);
    }

    #languages {
        transform: translateX(-22.5rem) translateY(-0.95rem);
        width: fit-content;
    }

    #degrees {
        transform: translateX(9.4rem) translateY(-18.4rem);
        padding-bottom: 1.5rem;
        width: fit-content;
    }

    #hobbys {
        transform: translateX(-9rem) translateY(-3rem);
        width: fit-content;
    }

    #container {
        height: 34.75rem;
    }

    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
        #degrees {
            transform: translateX(9.4rem) translateY(-19.7rem);
        }
    }

    @media (max-width: 64rem) {
        #about-me {
            transform: translateX(0rem);
        }

        #portrait {
            transform: translateX(8.3rem) translateY(-30.8rem);
        }

        #languages {
            transform: translateX(-9.4rem) translateY(0.7rem);
        }

        #degrees {
            transform: translateX(4.7rem) translateY(3.2rem);
        }

        #hobbys {
            transform: translateX(-10.4rem) translateY(1.4rem);
        }

        #container {
            height: 53.7rem;
        }


        @supports (-webkit-appearance: none) and (stroke-color: transparent) {
            #portrait {
                transform: translateX(8.3rem) translateY(-32.4rem);
            }

            #degrees {
                transform: translateX(4.8rem) translateY(2.2rem);
            }
        }
    }

    @media (max-width: 36rem) {

        #about-me,
        #languages,
        #degrees,
        #hobbys,
        #portrait {
            transform: translateX(0rem) translateY(0rem);


            width: calc(100vw - 2rem);
            margin: 0 auto;
            margin-bottom: 0.78rem;
        }

        #languages,
        #hobbys,
        #portrait {
            width: calc(100vw - 6rem);
        }

        #container {
            height: fit-content;
        }
    }
</style>