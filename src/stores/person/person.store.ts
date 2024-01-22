/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { CustomSessionStorage } from "../storages/session-storage";

interface PersonState {
    firsName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
}

const storeApi: StateCreator<PersonState & Actions> = (set) => ({
    firsName: "",
    lastName: "",

    setFirstName: (value) => set((state) => ({ firsName: value })),
    setLastName: (value) => set((state) => ({ lastName: value })),
});

export const usePersonStore = create<PersonState & Actions>()(
    persist(storeApi, { name: "person-storage", storage: CustomSessionStorage })
);
