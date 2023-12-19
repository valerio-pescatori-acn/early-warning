import { Icons } from "./Icon";

export type WidgetOrderingProps = {
	isFirst: boolean;
	isLast: boolean;
	onMoveUp: () => void;
	onMoveDown: () => void;
};

export const WidgetOrdering = ({ isFirst, isLast, onMoveUp, onMoveDown }: WidgetOrderingProps) => (
	<div className="absolute left-full top-0  hidden flex-col gap-6 rounded-r-lg border border-blue-light bg-blue-lighter p-2 lg:flex">
		<button onClick={() => onMoveUp()}>
			<Icons.arrowUp
				color={isFirst ? "primary-5" : undefined}
				className={`inline ${isFirst ? "cursor-not-allowed" : "cursor-pointer"}`}
			/>
		</button>
		<button onClick={() => onMoveDown()}>
			<Icons.arrowDown
				color={isLast ? "primary-5" : undefined}
				className={`inline ${isLast ? "cursor-not-allowed" : "cursor-pointer"}`}
			/>
		</button>
	</div>
);
