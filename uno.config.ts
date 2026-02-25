import { defineConfig } from 'unocss';

export default defineConfig({
    theme: {
        fontFamily: {
            sans: 'Work Sans',
        },
    },
    screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
    },
    breakpoints: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
    },
    colors: {
        'primary': 'rgb(18, 18, 18)',
        'primary-1': 'rgb(30, 30, 30)',
        'primary-2': 'rgb(70, 70, 70)',

        'accent': 'rgb(45, 101, 188)',
        'accent-1': 'rgb(55, 121, 218)',

        'green': 'rgb(99, 245, 131)',
        'blue': 'rgb(107, 214, 237)',
        'pink': 'rgb(234, 132, 171)',
        'yellow': 'rgb(242, 249, 133)',
        'orange': 'rgb(248, 156, 36)',
        'purple': 'rgb(182, 150, 245)',
    },
    preflights: [
        {
            getCSS: () => `
                @font-face {
                    font-family: 'Work Sans';
                    src: url('/assets/fonts/Work_Sans/WorkSans-VariableFont_wght.ttf') format('truetype');
                    font-weight: 100 900;
                    font-style: normal;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'Work Sans';
                    src: url('/assets/fonts/Work_Sans/WorkSans-Italic-VariableFont_wght.ttf') format('truetype');
                    font-weight: 100 900;
                    font-style: italic;
                    font-display: swap;
                }
                body {
                    margin: 0;
                    padding: 0;
                    background-color: rgb(18, 18, 18);
                }
                main {
                    display: flex;
                    flex-direction: column;
                }
                h1 {
                    font-family: Work Sans;
                    font-size: 4rem;
                    font-weight: 800;
                    color: white;
                    margin-top: 0;
                    margin-bottom: 0;
                    line-height: 4rem;
                    text-align: center;
                    @media (max-width: 1024px) {
                        font-size: clamp(3rem, 5.25vw, 6rem);
                    }
                }
                h2 {
                    font-family: Work Sans;
                    font-size: 1.7rem;
                    font-weight: 600;
                    color: white;
                    margin-top: 2.5rem;
                    margin-bottom: 0;
                }
                h3 {
                    font-family: Work Sans;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 1rem;
                }
                p, label {
                    font-family: Work Sans;
                    font-size: 1rem;
                    color: white;
                }
                .selectDisable {
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -o-user-select: none;
                    user-select: none;
                }
            `,
        },
    ],
    shortcuts: {
        '.box': 'bg-secondary border border-tertiary rounded-lg',
        '.hyperlink': 'text-accent hover:text-accent-1',
        '.primary-btn': 'bg-accent hover:bg-accent-1 text-white text-center rounded-md p-2',
        '.fade-in-visible': 'opacity-1 transition-opacity duration-500',
        '.fade-in-invisible': 'opacity-0 transition-opacity duration-500',
    },
});

