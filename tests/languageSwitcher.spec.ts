import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'

const mockSetLocale = vi.fn()

vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        locale: { value: 'de' },
        setLocale: mockSetLocale,
        t: (key: string) => key,
    }),
}))

describe('LanguageSwitcher', () => {
    it('renders language buttons', async () => {
        const wrapper = mount(LanguageSwitcher)
        const buttons = wrapper.findAll('button.tab')
        expect(buttons).toHaveLength(3)
        expect(buttons[0].text()).toContain('DE')
        expect(buttons[1].text()).toContain('EN')
        expect(buttons[2].text()).toContain('SV')
    })

    it('calls changeLanguage when a button is clicked', async () => {
        const wrapper = mount(LanguageSwitcher)
        const buttons = wrapper.findAll('button.tab')
        await buttons[1].trigger('click')
        expect(mockSetLocale).toHaveBeenCalledWith('en')
    })
})