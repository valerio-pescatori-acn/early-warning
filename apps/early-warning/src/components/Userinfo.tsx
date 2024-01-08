import { Icon } from "@ew/ui/Icon";

export function Userinfo() {
	return (
		<div className="flex items-center justify-between">
			<div className="mx-6 flex items-center">
				<div className="mr-2">
					<Icon.user />
				</div>
				<div className="mr-4 flex flex-col">
					<div className="text-sm font-bold leading-5">Mario Rossi</div>
					<div className="text-xs leading-5">Dirigente IG PNRR</div>
				</div>
			</div>
			<Icon.dropDown />
		</div>
	);
}
