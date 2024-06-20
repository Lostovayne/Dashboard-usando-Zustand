import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createDateSlice, DateSlice } from "./date.slice";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createPersonSlice, PersonSlice } from "./person.slice";

// Crear el store bound que recibe los slices
type ShareState = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
  }))
);
