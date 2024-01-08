import { AnimatedText } from "./AnimatedText";
import { Icon } from "./Icon";

export type CardProps = {
	icon: keyof typeof Icon;
	amount: string;
	unit: string;
	description: string;
};

export const Card = ({ icon, amount, unit, description }: CardProps) => (
	<div className="bg-primary-1 text-base-white flex items-center justify-between rounded-lg px-6 py-4 shadow-md lg:flex-col lg:items-baseline lg:justify-start lg:px-8 lg:py-6">
		<div className="flex items-center">
			{Icon[icon]({})}
			<AnimatedText el="span" text={`€ ${amount}`} className="ml-4 mr-2 text-2xl font-bold lg:mx-4 lg:text-3xl" />
			<AnimatedText el="span" text={unit} className="text-2xl font-light lg:text-3xl" />
		</div>
		<div className="text-base lg:mt-4 lg:text-2xl">{description}</div>
	</div>
);
