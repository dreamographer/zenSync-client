import { User } from "@/app/Types/userInterface";
import { persistNSync } from "persist-and-sync";
import { create } from "zustand";

type State = {
  user: User | null;
  expiry: string | null;
  setUser: (user: User | null, expiryMinutes?: number) => void;
};

export const useStore = create<State>(
  persistNSync(
    set => ({
      user: null,
      expiry: null,
      setUser: (user, expiryMinutes = 24 * 60) => {
        const expiry = new Date(
          Date.now() + expiryMinutes * 60 * 1000
        ).toISOString();
        set({ user, expiry });
      },
    }),
    { name: "userInfo", storage: "localStorage" }
  )
);

