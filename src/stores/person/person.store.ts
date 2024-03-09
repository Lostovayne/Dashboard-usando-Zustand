/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { FirebaseStorage } from "../storages/firebase-storage";

interface PersonState {
  firsName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firsName: "",
  lastName: "",

  setFirstName: (value) => set({ firsName: value }, false, "setFirstName"),
  setLastName: (value) => set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(storeApi, {
      name: "person-storage",
      // storage: FirebaseStorage
    })
  )
);
