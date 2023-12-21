import { RiskEnum } from "../utils/enum/RiskEnum";
import { riskToTruncatedLabel } from "../utils/risk-utils";

export type RiskChipProps = {
	risk: RiskEnum;
};

export const RiskChip = ({ risk }: RiskChipProps) => {
	const riskToColor: Record<RiskEnum, string> = {
		"Potenziale rischio elevato": "alert",
		"Rischio elevato": "alert",
		"Potenziale rischio moderato": "warning",
		"Rischio moderato": "warning",
		"Rischio basso/nullo": "success",
		"Nessun rischio": "success",
	};

	return (
		<div
			style={{
				backgroundColor: `rgba(var(--${riskToColor[risk]}), 0.5)`,
				borderColor: `rgb(var(--${riskToColor[risk]}))`,
			}}
			className="w-30 rounded border text-center"
		>
			{riskToTruncatedLabel[risk]}
		</div>
	);
};
