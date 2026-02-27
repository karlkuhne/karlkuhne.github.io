<script setup lang="ts">
    import { ref } from 'vue';

    const isVisible = ref(false);
    const elementRef = ref<HTMLElement | null>(null);
    const privacyLink = '<a href="legal" target="_blank" class="selectDisable hyperlink">Datenschutzrichtlinie</a>';

    useFadeInOnScroll(isVisible, elementRef);
</script>

<template>
    <div ref="elementRef" :class="`box ${isVisible ? 'fade-in-visible' : 'fade-in-invisible'}`" class="w-full max-w-screen-md mx-auto">
        <div class="border-b-solid border-b-2 border-b-primary-70 pl-4">
            <p>{{ $t('contact_form') }}</p>
        </div>

        <form class="p-4" action="https://formspree.io/f/xnnqzbbk" method="POST">
            <div>
                <label for="nameInput">{{ $t('name') }}</label> <br>
                <input id="nameInput" class="input" type="text" name="name" :placeholder="$t('placeholder_name')" required> <br>
                
                <label for="emailInput">{{ $t('e_mail_address') }}</label> <br>
                <input id="emailInput" class="input" type="email" name="email" :placeholder="$t('placeholder_email')" required> <br>
                
                <label for="messageInput">{{ $t('message') }}</label> <br>
                <textarea id="messageInput" class="input h-auto py-3 overflow-hidden line-height-6" name="message" rows="1" style="resize: none;"
                    oninput='this.style.height = ""; this.style.height = this.scrollHeight + "px";'
                    :placeholder="$t('placeholder_message')" required></textarea>
            </div>
            <div class="flex mb-4">
                <input id="consentCheckbox" type="checkbox" required>
                <label class="pl-1" for="consentCheckbox">
                    {{ $t('consent_1') }}
                    <a href="legal" target="_blank" class="selectDisable hyperlink">{{ $t('privacy_policy') }}</a>
                    {{ $t('consent_2') }}
                </label>
            </div>
            <div class="flex justify-end">
                <button class="primary-btn" type="submit">
                    <span>{{ $t('send') }}</span>
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
    li::marker {
        color: white;
        font-family: Work Sans;
        font-size: 1rem;
    }

    .input, .input::placeholder {
        font-family: 'Work Sans', sans-serif;
    }
</style>
