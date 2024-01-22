import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUtl = "https://zustand-storage-5a4d4-default-rtdb.firebaseio.com/zustand.json";

const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${firebaseUtl}/${name}`).then((res) => res.json());
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    setItem: function (name: string, value: string): void | Promise<void> {
        sessionStorage.setItem(name, value);
    },
    removeItem: function (name: string): void | Promise<void> {
        sessionStorage.removeItem(name);
    },
};

export const FirebaseStorage = createJSONStorage(() => storageApi);
