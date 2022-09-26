import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	css: ['@/styles/index.scss'],
    app: {
        head: {
            script: [
                { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js', body: true },
                { src: 'https://cdnjs.cloudflare.com/ajax/libs/tippy.js/6.3.7/tippy-bundle.umd.js', body: true },
                { src: 'https://cdnjs.cloudflare.com/ajax/libs/rellax/1.12.1/rellax.min.js', body: true },
            ],
        },
    },
})
