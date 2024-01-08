import { Icon } from "@ew/ui/Icon";

export type TrustIndexChipProps = {
	trustIndex: string;
};

export const TrustIndexChip = ({ trustIndex }: TrustIndexChipProps) => (
	<div className="border-blue-light bg-blue-lighter whitespace-nowrap rounded border px-2 ">
		<Icon.data />
		<span className="ml-1 text-xs font-bold">{parseFloat(trustIndex) * 100}%</span>
	</div>
);
