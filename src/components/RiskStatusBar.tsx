type BarSliceProps = {
	flexGrow: number;
	bgColor: string;
};

const BarSlice = ({ flexGrow, bgColor }: BarSliceProps) => (
	<div
		style={{ flexGrow, backgroundColor: `rgb(var(--${bgColor}))` }}
		className="h-4 shrink-0 rounded border border-base-white bg-gradient-to-r from-black/20 lg:rounded-2xl lg:border-2"
	/>
);

export type RiskStatusBarProps = {
	highRisk: number;
	mediumRisk: number;
	noRisk: number;
};

export const RiskStatusBar = ({ highRisk, mediumRisk, noRisk }: RiskStatusBarProps) => (
	<div className="flex">
		{highRisk > 0 && <BarSlice flexGrow={highRisk} bgColor="red-bar" />}
		{mediumRisk > 0 && <BarSlice flexGrow={mediumRisk} bgColor="yellow-bar" />}
		{noRisk > 0 && <BarSlice flexGrow={noRisk} bgColor="green-bar" />}
	</div>
);
