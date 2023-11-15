import { create } from "zustand";

interface Bears {
    id: number;
    name: string;
}

interface BearState {
    blackBears: number;
    polarBears: number;
    pandaBears: number;
    bears: Bears[];
    increaseBlackBears: (by: number) => void;
    increasePolarBears: (by: number) => void;
    increasePandaBears: (by: number) => void;

    doNothing: () => void;
    addBear: () => void;
    clearBears: () => void;
    computed: {
        totalBears: number;
    };
}

export const useBearStore = create<BearState>()((set, get) => ({
    blackBears: 10,
    polarBears: 5,
    pandaBears: 1,

    bears: [
        {
            id: 1,
            name: "Oso #1",
        },
    ],

    increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
    increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),
    increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),
    doNothing: () => set((state) => ({ bears: [...state.bears] })),
    addBear: () =>
        set((state) => ({ bears: [...state.bears, { id: state.bears.length, name: ` Oso ${state.bears.length} ` }] })),
    clearBears: () => set({ bears: [] }),
    computed: {
        get totalBears() {
            return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
        },
    },
}));
