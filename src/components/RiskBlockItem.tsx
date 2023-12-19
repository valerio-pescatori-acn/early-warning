import { Tooltip } from "react-tooltip";
import { RiskEnum } from "../utils/enum/RiskEnum";
import { riskToIcon, riskToTruncatedLabel, riskToLabel } from "../utils/risk-utils";

export type RiskBlockItemProps = {
	risk: RiskEnum;
	amount: number;
	useTruncatedLabels?: boolean;
	addTooltip?: boolean;
};

export const RiskBlockItem = ({ risk, amount, useTruncatedLabels = false, addTooltip = false }: RiskBlockItemProps) => (
	<div>
		{riskToIcon[risk]({ id: `${risk}-tt` })}
		{addTooltip && (
			<Tooltip
				anchorSelect={`#${risk}-tt`}
				place="top"
				disableStyleInjection={true}
				content={
					"La misura presenta una segnalazione di rischio elevato in quanto, per almeno una delle attività afferenti a questa, sono stati rilevati ritardi significativi di avanzamento (delta > 40%), tali da poter compromettere il conseguimento dell'obiettivo entro i termini previsti"
				}
			/>
		)}
		<span className="ml-2 font-bold">{amount}</span>

		<p className="hidden text-sm lg:block">{useTruncatedLabels ? riskToTruncatedLabel[risk] : riskToLabel[risk]}</p>
		<p className="text-sm lg:hidden">{riskToTruncatedLabel[risk]}</p>
	</div>
);
