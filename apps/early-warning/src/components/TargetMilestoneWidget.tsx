import * as d3 from "d3";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { api } from "../core/api/api";
import { httpClient } from "../core/interceptors/auth.interceptor";
import { RiskEnum } from "../utils/enum/RiskEnum";
import { store } from "../utils/store/store";
import { ODataResponse } from "../utils/types/axios";
import { MilestoneTarget } from "../utils/types/milestone-target";
import { RiskBlockSummary } from "./RiskBlockSummary";
import TabMenu, { Tab } from "./Tabmenu";
import { WidgetTitle } from "./WidgetTitle";
import { riskToColor } from "../utils/risk-utils";
import { DonutChartData } from "../utils/types/donutChart";
import { ItemStatusEnum } from "../utils/enum/ItemStatusEnum";
import { Skeleton } from "./Skeleton";

export interface RiskNumber {
	total: number;
	risky: number;
	low: number;
	medium: number;
	high?: number;
}

interface CustomSVGPathElement extends SVGPathElement {
	_current: unknown;
}

type MilestoneTargetChart = Pick<MilestoneTarget, "risk" | "status" | "type">;

const TargetMilestoneWidget = () => {
	const ref = useRef<SVGSVGElement | null>(null);
	const { selectedInstallment } = useSnapshot(store);
	const [data, setData] = useState<MilestoneTargetChart[]>([]);
	const [activeTab, setActiveTab] = useState<string>("ALL");
	const [filteredData, setFilteredData] = useState<DonutChartData[]>([]);
	const [risk, setRisk] = useState<RiskNumber>({ total: 0, risky: 0, low: 0, medium: 0, high: 0 });
	const [isLoading, setIsLoading] = useState(false);

	const tabs: Tab[] = [
		{ id: "ALL", nome: "Tutti" },
		{ id: "MIL", nome: "Milestone" },
		{ id: "TAR", nome: "Target" },
	];

	const countRisks = (data: MilestoneTargetChart[]): { riskKeys: DonutChartData[]; riskCount: RiskNumber } => {
		let riskToMap: MilestoneTargetChart[] = [];
		if (activeTab === "ALL") {
			riskToMap = data;
		} else {
			riskToMap = data.filter((item) => item.type === activeTab);
		}

		const uncompletedRiskToMap = riskToMap.filter((item) => item.status !== ItemStatusEnum.COMPLETATO);

		const riskCounts = uncompletedRiskToMap.reduce<Partial<Record<RiskEnum, number>>>((acc, item) => {
			const risk = item.risk;
			acc[risk] = (acc[risk] || 0) + 1;
			return acc;
		}, {});

		const riskKeys = Object.entries(riskCounts).map<DonutChartData>(([key, value]) => ({
			categoria: key as RiskEnum,
			valore: value as number,
		}));

		const riskTotal = uncompletedRiskToMap.length;
		const riskCount = uncompletedRiskToMap.filter(
			(item) => item.risk === RiskEnum.HIGH || item.risk === RiskEnum.POTENTIAL_HIGH,
		).length;
		const low = uncompletedRiskToMap.filter(
			(item) => item.risk === RiskEnum.LOW_TO_NULL || item.risk === RiskEnum.NO_RISK,
		).length;
		const medium = uncompletedRiskToMap.filter((item) => item.risk === RiskEnum.MEDIUM).length;

		return { riskKeys, riskCount: { total: riskTotal, risky: riskCount, low, medium } };
	};

	const fetchData = async () => {
		if (!selectedInstallment || isLoading) return;

		setIsLoading(true);
		try {
			const { results: res } = await httpClient.get<never, ODataResponse<MilestoneTargetChart>>(api.milestonesTargets, {
				params: {
					$filter: `period eq '${selectedInstallment.period}'`,
				},
			});
			setActiveTab("ALL");
			const cleanData = res.map((item: MilestoneTargetChart) => ({
				risk: item.risk,
				status: item.status,
				type: item.type,
			}));
			setData(cleanData);
			const { riskKeys, riskCount } = countRisks(cleanData);
			setFilteredData(riskKeys);
			setRisk(riskCount);
			drawChart();
		} catch (error) {
			console.error("Errore durante il recupero dei dati:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [selectedInstallment]);

	useEffect(() => {
		const { riskCount } = countRisks(data);
		setRisk(riskCount);
		drawChart();
	}, [data, activeTab, filteredData]);

	const drawChart = useCallback(() => {
		if (!ref.current) return;

		const width = 280;
		const height = 280;
		const margin = 10;

		d3.select(ref.current).selectAll("*").remove();

		const outerRadius = width / 2 - margin;
		const innerRadius = outerRadius - 7;
		const centerCircleRadius = 118;

		const svg = d3
			.select(ref.current)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${width / 2}, ${height / 2})`);

		const arc = d3.arc<d3.PieArcDatum<DonutChartData>>().innerRadius(innerRadius).outerRadius(outerRadius);
		const pie = drawPieAngle();
		const path = drawPie();
		drawTransition();
		svg.append("circle").attr("r", 0).attr("fill", "#E3E3E3").transition().duration(1000).attr("r", centerCircleRadius);

		function drawPie() {
			return svg
				.selectAll("path")
				.data(pie(countRisks(data).riskKeys))
				.enter()
				.append("path")
				.attr("fill", (d) => `rgb(var(--${riskToColor[d.data.categoria]}))`)
				.attr("d", arc)
				.each(function (d) {
					const element = this as unknown as CustomSVGPathElement;
					element._current = d;
				});
		}

		function drawTransition() {
			path
				.transition()
				.duration(1000)
				.attrTween("d", function (d) {
					const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
					return (t) => arc(interpolate(t)) || "";
				});
		}

		function drawPieAngle() {
			return d3
				.pie<DonutChartData>()
				.value((d) => d.valore)
				.padAngle(0.02);
		}
	}, [data, activeTab, filteredData]);

	const filterData = (tab: string) => {
		setActiveTab(tab);
	};

	const uncompletedActivities = useMemo(
		() => data.filter((item) => item.status !== ItemStatusEnum.COMPLETATO).length,
		[data],
	);

	const drawInternalCircle = useMemo(
		() => (
			<motion.div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
				<p className="text-center text-base text-slate-44">Milestone e target a rischio</p>
				<p className="text-2xl font-bold">{risk.risky}</p>
				<p className="mt-4 text-sm text-slate-44">Su un totale di </p>
				<p className="text-base font-bold">{risk.total}</p>
			</motion.div>
		),
		[risk],
	);

	const drawGlobalInfo = useMemo(
		() => (
			<div>
				<div id="title-block">
					<div id="widget-head" className="flex flex-col border-b border-primary-5 text-base">
						<WidgetTitle icon="flag" label="Milestone e Target" amount={data.length} wrapLabel={true} />
						<div className="my-8 ">
							Di cui <span className="font-bold">{uncompletedActivities}</span> da conseguire
						</div>
					</div>
				</div>
			</div>
		),
		[data],
	);

	if (isLoading) {
		return (
			<div className="mt-10">
				<Skeleton />
			</div>
		);
	}

	return (
		<div className="relative z-0 mt-6 flex flex-col justify-center rounded-lg border border-primary-5 bg-base-white px-8 py-6 lg:mt-10">
			{drawGlobalInfo}
			<div className="mt-8">
				<TabMenu tabs={tabs} activeTab={activeTab} onTabChange={filterData}></TabMenu>
			</div>
			<div className="relative">
				<div className="flex justify-center" ref={ref as React.RefObject<HTMLDivElement>}></div>
				{drawInternalCircle}
			</div>
			<div className="mt-6">
				<RiskBlockSummary highRisk={risk.risky} mediumRisk={risk.medium} noRisk={risk.low} useTruncatedLabels={true} />
			</div>
		</div>
	);
};

export default TargetMilestoneWidget;
