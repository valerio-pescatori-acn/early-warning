import { IconProps, Icon } from "@ew/ui/Icon";
import { RiskEnum } from "./enum/RiskEnum";

export const riskToIcon: Record<RiskEnum, React.FC<IconProps>> = {
	"Potenziale rischio elevato": Icon.highRisk,
	"Rischio elevato": Icon.highRisk,
	"Potenziale rischio moderato": Icon.mediumRisk,
	"Rischio moderato": Icon.mediumRisk,
	"Nessun rischio": Icon.noRisk,
	"Rischio basso/nullo": Icon.noRisk,
};

export const riskToColor: Record<RiskEnum, string> = {
	"Potenziale rischio elevato": "red-bar",
	"Rischio elevato": "red-bar",
	"Potenziale rischio moderato": "yellow-bar",
	"Rischio moderato": "yellow-bar",
	"Nessun rischio": "green-bar",
	"Rischio basso/nullo": "green-bar",
};

export const riskToLabel: Record<RiskEnum, string> = {
	"Potenziale rischio elevato": "Rischio elevato",
	"Rischio elevato": "Rischio elevato",
	"Potenziale rischio moderato": "Rischio moderato",
	"Rischio moderato": "Rischio moderato",
	"Nessun rischio": "Nessun rischio",
	"Rischio basso/nullo": "Nessun rischio",
};

export const riskToTruncatedLabel: Record<RiskEnum, string> = {
	"Potenziale rischio elevato": "Elevato",
	"Rischio elevato": "Elevato",
	"Potenziale rischio moderato": "Moderato",
	"Rischio moderato": "Moderato",
	"Nessun rischio": "Nessuno",
	"Rischio basso/nullo": "Nessuno",
};
