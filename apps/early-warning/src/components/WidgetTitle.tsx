import { IconProps, Icon } from "@ew/ui/Icon";

export type WidgetTitleProps = IconProps & {
	icon: keyof typeof Icon;
	label: string;
	amount: number | string | undefined;
	wrapLabel?: boolean;
};

export const WidgetTitle = ({ icon, label, amount, wrapLabel = false, ...iconProps }: WidgetTitleProps) => (
	<div className={`flex items-center ${wrapLabel ? "lg:flex-wrap lg:gap-y-2" : "flex-nowrap"}`}>
		{Icon[icon]({ className: "h-6 w-6 lg:h-10 lg:w-10", ...iconProps })}
		<span className="ml-2 text-lg font-bold lg:ml-4 lg:text-4xl">{amount}</span>
		<span
			className={`ml-auto text-base font-normal lg:text-lg lg:font-light ${
				wrapLabel ? "lg:ml-0 lg:w-full" : "lg:ml-6"
			}`}
		>
			{label}
		</span>
	</div>
);
