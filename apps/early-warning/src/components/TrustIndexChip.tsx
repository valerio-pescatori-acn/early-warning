import { Icons } from "./Icon";

export type TrustIndexChipProps = {
	trustIndex: string;
};

export const TrustIndexChip = ({ trustIndex }: TrustIndexChipProps) => (
	<div className="whitespace-nowrap rounded border border-blue-light bg-blue-lighter px-2 ">
		<Icons.data />
		<span className="ml-1 text-xs font-bold">{parseFloat(trustIndex) * 100}%</span>
	</div>
);
