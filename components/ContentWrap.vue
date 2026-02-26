<template>
    <div id="content-wrap" class="w-full md:w-screen-md">
        <slot />
    </div>
</template>

<style scoped>
    #content-wrap {
        margin: 0 auto;
        text-align: justify;
        line-height: 1.5rem;

        margin-top: 5rem;
        margin-bottom: 7rem;
    }
</style>