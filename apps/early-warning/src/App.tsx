import { useEffect } from "react";
import { AmountCard } from "./components/AmountCard";
import { Content } from "./components/Content";
import TargetMilestoneWidget from "./components/TargetMilestoneWidget";
import { Header } from "./components/Header";
import { api } from "./core/api/api";
import { httpClient } from "./core/interceptors/auth.interceptor";
import { store } from "./utils/store/store";
import { ODataResponse } from "./utils/types/axios";
import { Installment } from "./utils/types/installment";
import { sortInstallments } from "./utils/string-utils";

function App() {
	useEffect(() => {
		httpClient.get<never, ODataResponse<Installment>>(api.periodoRendicontazione).then(({ results }) => {
			results = results.sort(sortInstallments);
			store.selectedInstallment = results[0];
			store.availableInstallments = results;
		});
	}, []);

	return (
		<div className="m-auto max-w-7xl lg:px-5">
			<div className="mt-30 grid grid-cols-[minmax(280px,auto),1fr] lg:my-12">
				<Header />
			</div>
			<div className="grid grid-cols-12 gap-x-8 gap-y-4 px-5 lg:px-0">
				<aside className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
					<AmountCard />
					<TargetMilestoneWidget />
				</aside>
				<main className="col-span-12 pb-20 md:col-span-6 lg:col-span-8 xl:col-span-9">
					<Content />
				</main>
			</div>
		</div>
	);
}

export default App;
