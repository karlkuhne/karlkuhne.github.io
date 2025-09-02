<script setup lang="ts">
    import ContentWrap from '~/components/ContentWrap.vue';

    const { getPageContentByIdAndLang, getPageIdByLangAndName } = useDatabaseOperations();
    const { locale } = useI18n();

    const pageId = await getPageIdByLangAndName(locale.value, 'impressum');
    const content = await getPageContentByIdAndLang(pageId, locale.value);

    function formatNewlines(text: string): string {
        return text.replace(/(\r\n|\r|\n)/g, '<br>');
    }

    useHead({
        title: 'Karl Kuhne | Legal'
    })
</script>

<template>
    <ContentWrap>
        <p v-html="formatNewlines(content)" />
    </ContentWrap>
</template>