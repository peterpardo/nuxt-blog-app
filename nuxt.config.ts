// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/supabase"],
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3000",
    },
  },
});
