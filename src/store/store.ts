// store/store.ts
import { create } from "zustand";
type User = {
  id: string;
  fullname: string;
  email: string;
  profile: string|null;
  verified: boolean;
};
type State = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useStore = create<State>(set => ({
  user: null,
  setUser: (user) => set(() => ({ user:user })),
}));
