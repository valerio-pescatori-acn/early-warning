import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { useSnapshot } from "valtio";
import { api } from "../core/api/api";
import { httpClient } from "../core/interceptors/auth.interceptor";
import { widgetVariants } from "../utils/animation.utils";
import { RiskEnum } from "../utils/enum/RiskEnum";
import { store } from "../utils/store/store";
import { ODataResponse } from "../utils/types/axios";
import { Measurement } from "../utils/types/measurement";
import { MeasurementsTable } from "./MeasurementsTable";
import { RiskBlockSummary } from "./RiskBlockSummary";
import { RiskStatusBar } from "./RiskStatusBar";
import { WidgetOrdering, WidgetOrderingProps } from "./WidgetOrdering";
import { WidgetTitle } from "./WidgetTitle";
import { Skeleton } from "./Skeleton";

export type MeasurmentsWidgetProps = WidgetOrderingProps;

export const MeasurmentsWidget = ({ ...props }: MeasurmentsWidgetProps) => {
	const { selectedInstallment } = useSnapshot(store);
	const $top = 10;
	const [endOfData, setEndOfData] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const keyGetter: SWRInfiniteKeyLoader<ODataResponse<Measurement>, [string, any] | null> = (
		_index,
		previousPageData,
	) => {
		if (!selectedInstallment) return null;
		if (previousPageData && !previousPageData.results.length) {
			setEndOfData(true);
			return null;
		}
		return [
			/*
      TODO:
        togliere $inline count, la count dei rischi arriverà da un altro servizio.
        Aggiungere filtro 'risk ne ${RiskEnum.NO_RISK}' e attivare la paginazione
      */
			api.misure,
			{
				$expand: "to_ind_seq",
				$filter: `period eq '${selectedInstallment.period}'`,
				// $filter: `period eq '${selectedInstallment.period}' and risk ne '${RiskEnum.NO_RISK}'`,
				$inlinecount: "allpages",
				// $top,
				// $skip: $top * index,
			},
		];
	};

	const {
		data: tableRows,
		isLoading,
		size,
		setSize,
	} = useSWRInfinite(
		keyGetter,
		([url, params]) =>
			httpClient.get<never, ODataResponse<Measurement>>(url, {
				params,
			}),
		{
			initialSize: 1,
			revalidateOnReconnect: true,
			revalidateOnMount: true,
			revalidateAll: false,
			revalidateFirstPage: false,
			revalidateIfStale: false,
			revalidateOnFocus: false,
		},
	);

	const totalMeasurments = useMemo(() => {
		const tot = tableRows?.[0]?.__count;
		if (tot && tot < $top) {
			setEndOfData(true);
		}
		return tot;
	}, [tableRows]);
	const flattenedRows = useMemo(() => tableRows?.flatMap((r) => r.results), [tableRows]);
	const atRiskMeasurment = useMemo(
		() => flattenedRows?.filter((measurement) => measurement.risk !== RiskEnum.NO_RISK).length,
		[flattenedRows],
	);

	const highRiskMeasurments = useMemo(
		() => flattenedRows?.filter((measurement) => measurement.risk === RiskEnum.HIGH).length,
		[tableRows],
	);
	const mediumRiskMeasurments = useMemo(
		() => flattenedRows?.filter((measurement) => measurement.risk === RiskEnum.MEDIUM).length,
		[tableRows],
	);
	const noRiskMeasurments = useMemo(
		() => flattenedRows?.filter((measurement) => measurement.risk === RiskEnum.NO_RISK).length,
		[tableRows],
	);

	if (isLoading) {
		return <Skeleton />;
	}

	return (
		<motion.div variants={widgetVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
			<div className="relative rounded-lg border border-primary-5 bg-base-white px-6 py-8">
				{/* Ordering */}
				<WidgetOrdering {...props} />

				{/* Title */}
				<div id="title-block">
					<div id="widget-head" className="flex flex-col flex-wrap gap-y-8 lg:flex-row lg:justify-between lg:gap-y-6">
						<WidgetTitle icon="listItems" label="Misure" amount={totalMeasurments} />
						<div className="order-3 lg:order-2">
							<RiskBlockSummary
								highRisk={highRiskMeasurments ?? 0}
								mediumRisk={mediumRiskMeasurments ?? 0}
								noRisk={noRiskMeasurments ?? 0}
								addTooltip={true}
							/>
						</div>
						<div id="status-bar" className="order-2 w-full grow lg:order-3">
							<RiskStatusBar
								highRisk={highRiskMeasurments ?? 0}
								mediumRisk={mediumRiskMeasurments ?? 0}
								noRisk={noRiskMeasurments ?? 0}
							/>
						</div>
					</div>
				</div>

				{atRiskMeasurment && atRiskMeasurment > 0 ? (
					<div id="measurments" className="mt-10">
						<WidgetTitle
							color="error"
							icon="listItems"
							label='Misure a rischio "Early Warning"'
							amount={atRiskMeasurment}
						/>
						<MeasurementsTable size={size} setSize={setSize} rows={flattenedRows} endOfData={endOfData} />
					</div>
				) : (
					<div className="mt-10">
						<p className="text-center font-semibold text-primary-7">
							Non ci sono misure a rischio per questo periodo di rendicontazione
						</p>
					</div>
				)}
			</div>
		</motion.div>
	);
};
