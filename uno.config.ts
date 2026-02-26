import { defineConfig } from 'unocss';

export default defineConfig({
    safelist: ['gr', 'b', 'p', 'ge', 'o', 'l'],
    theme: {
        fontFamily: {
            sans: 'Work Sans',
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
            'primary-20': 'rgb(20, 20, 20)',
            'primary-30': 'rgb(30, 30, 30)',
            'primary-50': 'rgb(50, 50, 50)',
            'primary-60': 'rgb(60, 60, 60)',
            'primary-70': 'rgb(70, 70, 70)',
            'primary-80': 'rgb(80, 80, 80)',
            'primary-140': 'rgb(140, 140, 140)',
            'primary-180': 'rgb(180, 180, 180)',
            'primary-230': 'rgb(230, 230, 230)',
    
            'accent': 'rgb(45, 101, 188)',
            'accent-1': 'rgb(55, 121, 218)',
    
            'green': 'rgb(99, 245, 131)',
            'blue': 'rgb(107, 214, 237)',
            'pink': 'rgb(234, 132, 171)',
            'yellow': 'rgb(242, 249, 133)',
            'orange': 'rgb(248, 156, 36)',
            'purple': 'rgb(182, 150, 245)',
        },
    },
    preflights: [
        {
            getCSS: () => `
                body {
                    margin: 0;
                    padding: 0;
                    background-color: rgb(18, 18, 18);
                }
                main {
                    display: flex;
                    flex-direction: column;
                    margin: 0 auto;
                    width: 1280px;
                    @media (max-width: 1280px) {
                        width: calc(100vw - 2rem);
                    }
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
                span, p, label {
                    font-family: Work Sans;
                    color: white;
                    font-size: 1rem;
                    color: white;
                    font-weight: 410;
                }
                a {
                    font-family: Work Sans;
                    text-decoration: none;
                    font-weight: 410;
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
        'box': 'bg-primary-30 border-solid border-2 border-primary-70 rounded-lg',
        'hyperlink': 'text-accent hover:text-accent-1',
        'primary-btn': 'bg-accent hover:bg-accent-1 text-white text-center rounded-md p-2 border-none',
        'filter-btn': 'bg-primary-50 hover:bg-primary-60 border-none px-2.7 py-1.8 rounded-lg',
        'embla-arrows': 'absolute top-1/2 translate-y-[-50%] z-10 border-none cursor-pointer pointer-events-auto bg-transparent',
        'project-icon': 'w-4.4 h-4.4 fill-primary-80 stroke-primary-80 hover:fill-primary-140 hover:stroke-primary-140 cursor-pointer mr-2',
        'input': 'w-full h-12 bg-primary-20 border-solid border-2 border-primary-70 rounded-lg mb-4 mt-4 text-white text-[1rem]',
        'fade-in-visible': 'opacity-100 transition-opacity duration-500',
        'fade-in-invisible': 'opacity-0 transition-opacity duration-500',
        
        'gr': 'text-green',
        'b': 'text-blue',
        'p': 'text-pink',
        'ge': 'text-yellow',
        'o': 'text-orange',
        'l': 'text-purple',
    },
});