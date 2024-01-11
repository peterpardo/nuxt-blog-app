import type { User } from "~/types";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const useUserStore = defineStore("user", {
  state: (): User => ({ id: NaN, userId: "", name: "", email: "", avatar: "" }),
  actions: {
    async getCurrentUser(user: Ref<SupabaseUser | null>) {
      if (!user.value) return;

      const { data } = await useFetch(`/api/get-user/${user?.value?.id}`);

      const setData = (value: User) => {
        this.id = value.id;
        this.userId = value.userId;
        this.name = value.name;
        this.email = value.email;
        this.avatar = value.avatar;
      };

      if (!data.value) {
        const { data } = await useFetch(`/api/create-user`, {
          method: "POST",
          body: {
            userId: user.value?.id,
            name: user.value?.user_metadata.name,
            email: user.value?.email,
            avatar: user.value?.user_metadata.avatar_url,
          },
        });

        setData(data.value?.user as User);
      } else {
        setData(data.value?.user as User);
      }
    },
    async signOutUser() {
      const supabase = useSupabaseClient();
      const { error } = await supabase.auth.signOut();

      this.$reset();

      if (error) console.log(error);
    },
  },
});
