import { persistNSync } from "persist-and-sync";
import { create } from "zustand";
type User = {
  id: string;
  fullname: string;
  email: string;
  profile: string | null;
  verified: boolean;
};
type State = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useStore = create<State>(
  persistNSync(
    set => ({
      user: null,
      setUser: user => set({user}),
    }),
    { name: "userInfo", storage:"localStorage" }
  )
);
