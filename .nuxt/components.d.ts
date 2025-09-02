
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AboutBoxes': typeof import("../components/AboutBoxes.vue")['default']
    'AllProjectsButton': typeof import("../components/AllProjectsButton.vue")['default']
    'ContactForm': typeof import("../components/ContactForm.vue")['default']
    'ContentWrap': typeof import("../components/ContentWrap.vue")['default']
    'Cover': typeof import("../components/Cover.vue")['default']
    'Footer': typeof import("../components/Footer.vue")['default']
    'Header': typeof import("../components/Header.vue")['default']
    'LanguageSwitcher': typeof import("../components/LanguageSwitcher.vue")['default']
    'Lightbox': typeof import("../components/Lightbox.vue")['default']
    'Loader': typeof import("../components/Loader.vue")['default']
    'Project': typeof import("../components/Project.vue")['default']
    'Seperator': typeof import("../components/Seperator.vue")['default']
    'YouTubePlayer': typeof import("../components/YouTubePlayer.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.6.1_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.6.1_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'NuxtLinkLocale': typeof import("../node_modules/.pnpm/@nuxtjs+i18n@10.0.3_@netlify+blobs@9.1.2_@vue+compiler-dom@3.5.17_db0@0.3.2_eslint@9.31_651d71a3003ce525d7caaa2530c1d6b9/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
    'SwitchLocalePathLink': typeof import("../node_modules/.pnpm/@nuxtjs+i18n@10.0.3_@netlify+blobs@9.1.2_@vue+compiler-dom@3.5.17_db0@0.3.2_eslint@9.31_651d71a3003ce525d7caaa2530c1d6b9/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
    'NuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyAboutBoxes': LazyComponent<typeof import("../components/AboutBoxes.vue")['default']>
    'LazyAllProjectsButton': LazyComponent<typeof import("../components/AllProjectsButton.vue")['default']>
    'LazyContactForm': LazyComponent<typeof import("../components/ContactForm.vue")['default']>
    'LazyContentWrap': LazyComponent<typeof import("../components/ContentWrap.vue")['default']>
    'LazyCover': LazyComponent<typeof import("../components/Cover.vue")['default']>
    'LazyFooter': LazyComponent<typeof import("../components/Footer.vue")['default']>
    'LazyHeader': LazyComponent<typeof import("../components/Header.vue")['default']>
    'LazyLanguageSwitcher': LazyComponent<typeof import("../components/LanguageSwitcher.vue")['default']>
    'LazyLightbox': LazyComponent<typeof import("../components/Lightbox.vue")['default']>
    'LazyLoader': LazyComponent<typeof import("../components/Loader.vue")['default']>
    'LazyProject': LazyComponent<typeof import("../components/Project.vue")['default']>
    'LazySeperator': LazyComponent<typeof import("../components/Seperator.vue")['default']>
    'LazyYouTubePlayer': LazyComponent<typeof import("../components/YouTubePlayer.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.6.1_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.6.1_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyNuxtLinkLocale': LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@10.0.3_@netlify+blobs@9.1.2_@vue+compiler-dom@3.5.17_db0@0.3.2_eslint@9.31_651d71a3003ce525d7caaa2530c1d6b9/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
    'LazySwitchLocalePathLink': LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@10.0.3_@netlify+blobs@9.1.2_@vue+compiler-dom@3.5.17_db0@0.3.2_eslint@9.31_651d71a3003ce525d7caaa2530c1d6b9/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AboutBoxes: typeof import("../components/AboutBoxes.vue")['default']
export const AllProjectsButton: typeof import("../components/AllProjectsButton.vue")['default']
export const ContactForm: typeof import("../components/ContactForm.vue")['default']
export const ContentWrap: typeof import("../components/ContentWrap.vue")['default']
export const Cover: typeof import("../components/Cover.vue")['default']
export const Footer: typeof import("../components/Footer.vue")['default']
export const Header: typeof import("../components/Header.vue")['default']
export const LanguageSwitcher: typeof import("../components/LanguageSwitcher.vue")['default']
export const Lightbox: typeof import("../components/Lightbox.vue")['default']
export const Loader: typeof import("../components/Loader.vue")['default']
export const Project: typeof import("../components/Project.vue")['default']
export const Seperator: typeof import("../components/Seperator.vue")['default']
export const YouTubePlayer: typeof import("../components/YouTubePlayer.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.6.1_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.6.1_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const NuxtLinkLocale: typeof import("../node_modules/.pnpm/@nuxtjs+i18n@10.0.3_@netlify+blobs@9.1.2_@vue+compiler-dom@3.5.17_db0@0.3.2_eslint@9.31_651d71a3003ce525d7caaa2530c1d6b9/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../node_modules/.pnpm/@nuxtjs+i18n@10.0.3_@netlify+blobs@9.1.2_@vue+compiler-dom@3.5.17_db0@0.3.2_eslint@9.31_651d71a3003ce525d7caaa2530c1d6b9/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyAboutBoxes: LazyComponent<typeof import("../components/AboutBoxes.vue")['default']>
export const LazyAllProjectsButton: LazyComponent<typeof import("../components/AllProjectsButton.vue")['default']>
export const LazyContactForm: LazyComponent<typeof import("../components/ContactForm.vue")['default']>
export const LazyContentWrap: LazyComponent<typeof import("../components/ContentWrap.vue")['default']>
export const LazyCover: LazyComponent<typeof import("../components/Cover.vue")['default']>
export const LazyFooter: LazyComponent<typeof import("../components/Footer.vue")['default']>
export const LazyHeader: LazyComponent<typeof import("../components/Header.vue")['default']>
export const LazyLanguageSwitcher: LazyComponent<typeof import("../components/LanguageSwitcher.vue")['default']>
export const LazyLightbox: LazyComponent<typeof import("../components/Lightbox.vue")['default']>
export const LazyLoader: LazyComponent<typeof import("../components/Loader.vue")['default']>
export const LazyProject: LazyComponent<typeof import("../components/Project.vue")['default']>
export const LazySeperator: LazyComponent<typeof import("../components/Seperator.vue")['default']>
export const LazyYouTubePlayer: LazyComponent<typeof import("../components/YouTubePlayer.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.6.1_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.6.1_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@10.0.3_@netlify+blobs@9.1.2_@vue+compiler-dom@3.5.17_db0@0.3.2_eslint@9.31_651d71a3003ce525d7caaa2530c1d6b9/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@10.0.3_@netlify+blobs@9.1.2_@vue+compiler-dom@3.5.17_db0@0.3.2_eslint@9.31_651d71a3003ce525d7caaa2530c1d6b9/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.7_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.2.1_@vue+compiler_1337a81a4c05807c9a0b02ca474ed76f/node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
