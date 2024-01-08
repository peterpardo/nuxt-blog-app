export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (user && user.value) {
    return navigateTo("/");
  }
});
