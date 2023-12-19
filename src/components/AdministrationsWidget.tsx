import { memo } from "react";
import { WidgetOrdering, WidgetOrderingProps } from "./WidgetOrdering";

export type AdministrationsWidgetProps = WidgetOrderingProps;

export const AdministrationsWidget = memo(({ ...props }: AdministrationsWidgetProps) => (
	<div className="relative h-96 w-full rounded-lg border border-primary-5 bg-base-white">
		<WidgetOrdering {...props} />
	</div>
));
