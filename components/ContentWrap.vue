<template>
    <div id="content-wrap">
        <slot />
    </div>
</template>

<style scoped lang="scss">
    #content-wrap {
        width: $screen-md;
        margin: 0 auto;
        text-align: justify;
        line-height: 1.5rem;

        margin-top: 5rem;
        margin-bottom: 7rem;
    }

    @include md {
        #content-wrap {
            width: calc(100vw - 2rem);
        }
    }
</style>