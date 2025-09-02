<template>
    <div ref="elementRef" :class="`box ${isVisible ? 'fade-in-visible' : 'fade-in-invisible'}`" id="contact-form">
        <div class="label">
            <p>{{ $t('contact_form') }}</p>
        </div>

        <form id="form" action="https://formspree.io/f/xnnqzbbk" method="POST">
            <ol>
                <li>
                    <label for="nameInput">name</label> <br>
                    <input id="nameInput" type="text" name="name" required>
                </li>
                <li>
                    <label for="emailInput">{{ $t('e_mail_address') }}</label> <br>
                    <input id="emailInput" type="email" name="email" required>
                </li>
                <li>
                    <label for="messageInput">{{ $t('message') }}</label> <br>
                    <textarea id="messageInput" name="message" rows="1" style="resize: none;"
                        oninput='this.style.height = ""; this.style.height = this.scrollHeight + "px";'
                        required></textarea>
                </li>
            </ol>
            <div class="checkbox-container">
                <input id="consentCheckbox" type="checkbox" required>
                <label id="checkbox-text" for="consentCheckbox">
                    {{ $t('consent_1') }}
                    <a href="legal" target="_blank" class="selectDisable hyperlink">{{ $t('privacy_policy') }}</a>
                    {{ $t('consent_2') }}
                </label>
            </div>
            <div id="button-container">
                <input id="sendButton" type="submit" value="senden">
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const isVisible = ref(false);
    const elementRef = ref<HTMLElement | null>(null);
    const privacyLink = '<a href="legal" target="_blank" class="selectDisable hyperlink">Datenschutzrichtlinie</a>';

    useFadeInOnScroll(isVisible, elementRef);
</script>


<style scoped>

    #contact-form {
        margin: 0 auto;
    }

    .label {
        border-bottom: var(--border);
        padding-left: 1rem;
    }

    #form {
        width: 45rem;
    }

    #form>ol {
        margin-bottom: 0;
        margin-top: 1rem;
    }

    input[type="text"],
    input[type="email"],
    textarea {
        width: 38.7rem;
        height: 3rem;
        background-color: rgb(18, 18, 18);

        font-family: Work Sans;
        font-size: 1rem;
        color: white;

        border: var(--border);
        border-radius: 0.5rem;

        margin-bottom: 1rem;
        padding-left: 1rem;
    }

    #nameInput,
    #emailInput,
    #messageInput {
        margin-top: 1rem;
    }

    textarea {
        height: 2.85rem;
        overflow: hidden;
        width: 40.2rem;

        padding-top: 0.8rem;
        padding-bottom: 2.3rem;
        box-sizing: border-box;
    }

    li::marker {
        color: white;
        font-family: Work Sans;
        font-size: 1rem;
    }

    @media (max-width: 48rem) {
        #form {
            width: calc(100vw - 2rem);
            margin: 0 auto;
        }

        input[type="text"],
        input[type="email"],
        textarea {
            width: calc(100% - 3.7rem);
            height: 2.55rem;
        }

        textarea {
            width: calc(100% - 2.3rem);
            height: 1rem;
        }
    }

    .checkbox-container {
        display: flex;
        margin-left: 1rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
    }

    #checkbox-text {
        padding-right: 1rem;
    }

    .checkbox-container input[type="checkbox"] {
        margin-right: 10px;
        margin-top: 2px;
        width: 1rem;
    }

    .checkbox-container .checkbox-text {
        font-size: 1rem;
        color: white;
        font-family: Work Sans;
    }


    #button-container {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }

    #sendButton {
        background-color: rgb(11, 102, 194);
        transition: background-color 0.15s;

        border: none;
        border-radius: 0.5rem;

        font-family: Work Sans;
        font-size: 1rem;
        color: white;

        padding: 0.4rem 0.75rem 0.4rem 0.75rem;

        margin-bottom: 1.5rem;
        margin-right: 2.4rem;
    }

    #sendButton:hover {
        background-color: rgb(5, 79, 155);
        cursor: pointer;
        color: #b5b5b5;
    }
</style>
