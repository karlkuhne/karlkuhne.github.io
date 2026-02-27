<script setup lang="ts">
    import markdownit from 'markdown-it';

    const { getPageContentByIdAndLang, getPageIdByLangAndName } = useDatabaseOperations();
    const { locale } = useI18n();
    const md = markdownit();

    const pageId = await getPageIdByLangAndName(locale.value, 'impressum');
    const content = await md.render(await getPageContentByIdAndLang(pageId, locale.value));

    function formatNewlines(text: string): string {
        return text.replace(/(\r\n|\r|\n)/g, '<br>');
    }

    useHead({
        title: 'Karl Kuhne | Legal'
    })
</script>

<template>
    <main>
        <ContentWrap>
            <p v-html="content" />
        </ContentWrap>
    </main>
</template>