import { Address } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface CounterState {
  addresses: Address[];
}

// Define the initial state using that type
const initialState: CounterState = {
  addresses: [],
};

export const addressBookSlice = createSlice({
  name: "address",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      /** TODO: Prevent duplicate addresses */
      // Prevent duplicate addresses (same id only)
      const exists = state.addresses.some(a => a.id === action.payload.id);

      if (exists) {
        return;
      }

      const fn = action.payload.firstName?.trim() ?? "";
      const ln = action.payload.lastName?.trim() ?? "";

      state.addresses.push({ ...action.payload, firstName: fn, lastName: ln });

    },
    removeAddress: (state, action: PayloadAction<string>) => {
      /** TODO: Write a state update which removes an address from the addresses array. */
      const id = action.payload;
      if (!id) return;
      state.addresses = state.addresses.filter((a) => a.id !== id);
    },
    updateAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
  },
});

export const { addAddress, removeAddress, updateAddresses } =
  addressBookSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
export const selectAddress = (state: RootState) => state.addressBook.addresses;

export default addressBookSlice.reducer;
