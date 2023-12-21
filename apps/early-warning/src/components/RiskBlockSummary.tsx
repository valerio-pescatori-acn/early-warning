import { RiskEnum } from "../utils/enum/RiskEnum";
import { RiskBlockItem } from "./RiskBlockItem";

export type RiskBlockSummaryProps = {
	highRisk: number;
	mediumRisk: number;
	noRisk: number;
	useTruncatedLabels?: boolean;
	addTooltip?: boolean;
};

export const RiskBlockSummary = ({
	highRisk,
	mediumRisk,
	noRisk,
	useTruncatedLabels,
	addTooltip = false,
}: RiskBlockSummaryProps) => (
	<div
		className={`ml-auto flex flex-wrap gap-6 gap-y-4 rounded bg-blue-lighter px-4 py-2 ${
			useTruncatedLabels ? "" : "lg:flex-nowrap lg:gap-11 lg:py-1 "
		}`}
	>
		<p className={`w-full ${useTruncatedLabels ? "" : "lg:hidden"}`}>Stato di rischio</p>
		<div className="grow">
			<RiskBlockItem
				risk={RiskEnum.HIGH}
				amount={highRisk ?? 0}
				useTruncatedLabels={useTruncatedLabels}
				addTooltip={addTooltip}
			/>
		</div>
		<div className="grow">
			<RiskBlockItem
				risk={RiskEnum.MEDIUM}
				amount={mediumRisk ?? 0}
				useTruncatedLabels={useTruncatedLabels}
				addTooltip={addTooltip}
			/>
		</div>
		<div className="grow">
			<RiskBlockItem risk={RiskEnum.NO_RISK} amount={noRisk ?? 0} useTruncatedLabels={useTruncatedLabels} />
		</div>
	</div>
);
