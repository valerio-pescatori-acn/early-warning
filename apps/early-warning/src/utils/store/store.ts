import { proxy } from "valtio";
import { Installment } from "../types/installment";
import type {} from "@redux-devtools/extension";
import { devtools } from "valtio/utils";

type Store = {
	selectedInstallment: Installment | null;
	availableInstallments: Installment[] | null;
};

export const store = proxy<Store>({
	selectedInstallment: null,
	availableInstallments: null,
});

const unsub = devtools(store, { name: "early-warning", enabled: true });
unsub;
