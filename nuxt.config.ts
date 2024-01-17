// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/supabase"],
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      apiBase: "https://nuxt-blog-app-psi.vercel.app",
      bucketUrl: process.env.BUCKET_URL,
    },
  },
  ssr: false,
});
