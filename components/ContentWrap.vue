<template>
    <div id="content-wrap">
        <slot />
    </div>
</template>

<style scoped>
    #content-wrap {
        width: 45rem;
        margin: 0 auto;
        text-align: justify;
        line-height: 1.5rem;

        margin-top: 5rem;
        margin-bottom: 7rem;
    }

    @media (max-width: 47rem) {
        #content-wrap {
            width: calc(100vw - 2rem);
        }
    }
</style>