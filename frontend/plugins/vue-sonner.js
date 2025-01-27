import { Toaster } from 'vue-sonner';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
    // Registra o Toaster globalmente
    nuxtApp.vueApp.component('Toaster', Toaster);
});
