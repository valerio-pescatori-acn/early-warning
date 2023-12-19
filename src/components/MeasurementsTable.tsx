import { useIntersectionObserver } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { Fragment, memo, useEffect, useMemo, useRef, useState } from "react";
import { tableVariants } from "../utils/animation.utils";
import { useDebounceCallback } from "../utils/hooks/useDebounceCallback";
import { useTailwindBreakpoint } from "../utils/hooks/useTailwindBreakpoint";
import { ODataResponse } from "../utils/types/axios";
import { Measurement } from "../utils/types/measurement";
import { Icons } from "./Icon";
import { MilestoneTargetCell } from "./MilestoneTargetCell";
import { RiskChip } from "./RiskChip";
import { RiskEnum } from "../utils/enum/RiskEnum";
import { Tooltip } from "react-tooltip";

export type MeasurementsTableProps = {
	size: number;
	setSize: (size: number | ((_size: number) => number)) => Promise<ODataResponse<Measurement>[] | undefined>;
	rows: Measurement[] | undefined;
	endOfData: boolean;
};

export const MeasurementsTable = memo(({ size, setSize, rows, endOfData }: MeasurementsTableProps) => {
	const [remainingScroll, setRemainingScroll] = useState(2);
	const tableRef = useRef<HTMLDivElement>(null);
	const atRiskRows = useMemo(() => rows?.filter((measurement) => measurement.risk !== RiskEnum.NO_RISK), [rows]);
	const hasShadow = useMemo(() => remainingScroll > 1 && atRiskRows && atRiskRows.length > 1, [remainingScroll]);
	const { bpGtThan, bpLtThan } = useTailwindBreakpoint();

	const [ref, entry] = useIntersectionObserver({
		threshold: 0,
	});

	useEffect(() => {
		if (entry?.isIntersecting && !endOfData) {
			setSize(size + 1);
		}
	}, [entry?.isIntersecting]);

	const handleTableScroll = (target: HTMLDivElement) => {
		const newRemainingScroll = target.scrollHeight - target.scrollTop - target.clientHeight;
		if (newRemainingScroll !== remainingScroll) {
			setRemainingScroll(newRemainingScroll);
		}
	};

	const debouncedHandleTableScroll = useDebounceCallback(50, handleTableScroll);

	return (
		<div className="relative">
			{/* GRADIENT */}
			<div
				className={`absolute inset-0 -bottom-4 z-10 transition-all ${
					hasShadow ? "bg-gradient-to-t" : ""
				} pointer-events-none flex flex-col justify-end from-base-white to-25%`}
			>
				{bpLtThan("lg") && !endOfData && (
					<button
						className="pointer-events-auto mb-2 flex items-center justify-center gap-2 text-primary-2"
						tabIndex={2}
						onClick={() => !endOfData && setSize(size + 1)}
					>
						Carica altro
						<Icons.addCircle />
					</button>
				)}
			</div>

			{/* TABLE */}
			<div
				ref={tableRef}
				onScroll={(e) => bpGtThan("lg") && debouncedHandleTableScroll(e.target as HTMLDivElement)}
				id="measurments-list"
				className={`mt-6 grid max-h-132 auto-rows-max grid-cols-1 gap-4 overflow-y-auto rounded-none border-0 border-primary-5 ${
					hasShadow ? "pb-16" : ""
				} lg:grid-cols-measurments lg:gap-0 lg:rounded-lg lg:border lg:pb-0`}
			>
				{bpGtThan("lg") ? (
					// table rows
					<>
						{/* HEADER */}
						<div className="sticky top-0 z-10 col-span-1 border-b border-primary-5 bg-base-white py-4 pl-6 text-sm font-semibold text-primary-7">
							Misura e amministrazione
						</div>
						<div className="sticky top-0 z-10 col-span-1 border-b border-primary-5 bg-base-white py-4 text-sm font-semibold text-primary-7 ">
							Stato di rischio
						</div>
						<div className="sticky top-0 z-10 col-span-2 flex justify-between border-b border-primary-5 bg-base-white py-4 pl-2 text-sm font-semibold text-primary-7">
							<span>Milestone, target e attività</span>
							<span className="mr-6">
								<Icons.tooltip id="trust-index-tooltip" />
								<Tooltip
									anchorSelect="#trust-index-tooltip"
									place="top"
									disableStyleInjection={true}
									content={
										"È il rapporto tra N° progetti (o Valore target programmato) in Regis e N° progetti dichiarati nell'obiettivo (o Valore target totale) per attività con obiettivo di completamento iter di progetto (o di raggiungimento target). Maggiore è il valore, maggiore è l'affidabilità della segnalazione."
									}
								/>
								Indice di affidabilità
							</span>
						</div>

						{/* ROWS */}

						{atRiskRows?.map((row, i) => (
							<Fragment key={`table-row-${i}`}>
								{/* COL 1 */}
								<motion.div
									onAnimationComplete={() =>
										i === atRiskRows.length - 1 && tableRef.current && handleTableScroll(tableRef.current)
									}
									custom={1}
									variants={tableVariants}
									initial="hidden"
									animate="visible"
									className={`col-span-1 ${
										i === atRiskRows.length - 1 ? "" : "border-b"
									} border-primary-5 py-4 pl-6 pr-14`}
								>
									<p className="overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold">{row.name}</p>
									<p className="mt-1 text-xs text-primary-6">{row.administrationName}</p>
									<a href="/" className="mt-4">
										Vai alla misura
									</a>
									<Icons.chevronRight className="ml-2 inline-block" />
								</motion.div>
								{/* COL 2 */}
								<motion.div
									custom={1}
									variants={tableVariants}
									initial="hidden"
									animate="visible"
									className={`col-span-1 ${
										i === atRiskRows.length - 1 ? "" : "border-b"
									} relative border-primary-5 py-4 pr-7 after:absolute after:right-0 after:top-4 after:block after:h-16 after:w-px after:bg-primary-5`}
								>
									<RiskChip risk={row.risk} />
								</motion.div>
								{/* COL 3 */}
								<motion.div
									custom={1}
									variants={tableVariants}
									initial="hidden"
									animate="visible"
									className={`col-span-2 ${
										i === atRiskRows.length - 1 ? "" : "border-b"
									} border-primary-5 py-4 pl-2 pr-4`}
								>
									<div className="flex flex-col gap-4">
										{row.to_ind_seq.results.slice(0, 2).map((el, milTarIdx) => (
											<MilestoneTargetCell key={`row-${i}-mil-tar-${milTarIdx}`} {...el} />
										))}
									</div>
								</motion.div>
							</Fragment>
						))}

						{/* OBSERVED ELEMENT */}
						<div ref={ref} className="invisible h-px" />
					</>
				) : (
					// cell rows
					<>
						{atRiskRows?.map((row, i) => (
							<div
								key={`table-row-${i}`}
								className="m-px flex flex-col gap-8 rounded-lg bg-primary-3 p-4 text-sm shadow-tile"
							>
								{/* CARD HEAD */}
								<div>
									<p className="font-semibold text-primary-7">Misura e amministrazione</p>
									<p className="mt-2 font-semibold">{row.name}</p>
									<p className="text-xs">{row.administrationName}</p>
									<a href="/" className="mt-4">
										Vai alla misura
									</a>
									<Icons.chevronRight className="ml-2 inline-block" />
								</div>
								{/* MEASURMENT RISK */}
								<div className="flex flex-col items-start gap-2">
									<p className="font-semibold text-primary-7">Stato di rischio</p>
									<RiskChip risk={row.risk} />
								</div>
								{/* MILESTONES */}
								<div className="flex flex-col gap-4">
									<p className="font-semibold text-primary-7">Milestone, target e attività</p>
									{row.to_ind_seq.results.slice(0, 2).map((el, milTarIdx) => (
										<Fragment key={`row-${i}-mil-tar-${milTarIdx}`}>
											<MilestoneTargetCell {...el} />
											{milTarIdx !== 1 && <div className="w-full border-b border-primary-5" />}
										</Fragment>
									))}
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
});
