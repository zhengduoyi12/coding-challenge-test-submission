import {
  addAddress,
  removeAddress,
  selectAddress,
  updateAddresses,
} from "../../core/reducers/addressBookSlice";
import { Address } from "@/types";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";

import transformAddress, { RawAddressModel } from "../../core/models/address";
import databaseService from "../../core/services/databaseService";

export default function useAddressBook() {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectAddress);
  const [loading, setLoading] = React.useState(true);

  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    if (!hydrated) return;
    databaseService.setItem("addresses", addresses);
  }, [addresses, hydrated]);

  return {
    /** Add address to the redux store */
    addAddress: (address: Address) => {
      dispatch(addAddress(address));
    },
    /** Remove address by ID from the redux store */
    removeAddress: (id: string) => {
      dispatch(removeAddress(id));
    },
    /** Loads saved addresses from the indexedDB */
    loadSavedAddresses: async () => {
      const saved: RawAddressModel[] | null =
        await databaseService.getItem("addresses");

      if (!saved || !Array.isArray(saved)) {
        setLoading(false);
        setHydrated(true);
        return;
      }

      dispatch(updateAddresses(saved.map((a) => transformAddress(a))));
      setLoading(false);
      setHydrated(true);
    },
    loading,
  };
}
