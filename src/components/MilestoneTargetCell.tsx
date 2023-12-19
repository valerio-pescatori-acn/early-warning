import { RiskEnum } from "../utils/enum/RiskEnum";
import { riskToIcon } from "../utils/risk-utils";
import { TrustIndexChip } from "./TrustIndexChip";

export type MilestoneTargetCellProps = {
	risk: RiskEnum;
	name: string;
	trustIndex: string;
	code?: string;
};

export const MilestoneTargetCell = ({ risk, name, code, trustIndex }: MilestoneTargetCellProps) => (
	<div className="flex w-full flex-wrap items-center gap-2 lg:flex-nowrap">
		<span className="lg:order-0 order-1">{riskToIcon[risk]({})}</span>
		{code && (
			<div className="order-0 w-full lg:order-1 lg:w-auto">
				<span className="inline-block whitespace-nowrap rounded bg-primary-1 px-2 text-xs font-bold text-base-white">
					{code}
				</span>
			</div>
		)}
		<a className="order-2 line-clamp-2 lg:line-clamp-1" href="/">
			{name}
		</a>
		<div className="order-3 ml-auto w-full lg:w-auto">
			<div className="flex items-center justify-between">
				<span className="text-xs font-semibold text-primary-7 lg:hidden">Indice di affidabilità:</span>
				<TrustIndexChip trustIndex={trustIndex} />
			</div>
		</div>
	</div>
);
