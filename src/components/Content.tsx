import { ReactNode, useMemo, useState } from "react";
import { WidgetsEnum as WidgetEnum } from "../utils/enum/WidgetsEnum";
import { AdministrationsWidget } from "./AdministrationsWidget";
import { MeasurmentsWidget } from "./MeasurmentsWidget";

export const Content = () => {
	const [widgets, setWidgets] = useState<WidgetEnum[]>([WidgetEnum.MEASURMENTS, WidgetEnum.ADMINISTRATIONS]);

	const measurmentIdx = useMemo(() => widgets.findIndex((w) => w === WidgetEnum.MEASURMENTS), [widgets]);
	const administrationsIdx = useMemo(() => widgets.findIndex((w) => w === WidgetEnum.ADMINISTRATIONS), [widgets]);

	const moveUp = (position: number) => {
		if (position > 0) {
			setWidgets([
				...widgets.slice(0, position - 1),
				widgets[position],
				widgets[position - 1],
				...widgets.slice(position + 1),
			]);
		}
	};

	const moveDown = (position: number) => {
		if (position < widgets.length - 1) {
			setWidgets([
				...widgets.slice(0, position),
				widgets[position + 1],
				widgets[position],
				...widgets.slice(position + 2),
			]);
		}
	};

	const getComponentWidget: Record<WidgetEnum, ReactNode> = useMemo(
		() => ({
			[WidgetEnum.MEASURMENTS]: (
				<MeasurmentsWidget
					key="measurments"
					isFirst={measurmentIdx === 0}
					isLast={measurmentIdx === widgets.length - 1}
					onMoveUp={() => moveUp(measurmentIdx)}
					onMoveDown={() => moveDown(measurmentIdx)}
				/>
			),
			[WidgetEnum.ADMINISTRATIONS]: (
				<AdministrationsWidget
					key="administrations"
					isFirst={administrationsIdx === 0}
					isLast={administrationsIdx === widgets.length - 1}
					onMoveUp={() => moveUp(administrationsIdx)}
					onMoveDown={() => moveDown(administrationsIdx)}
				/>
			),
		}),
		[measurmentIdx, administrationsIdx],
	);

	return <div className="flex flex-col gap-10 pr-0 lg:pr-10">{widgets.map((w) => getComponentWidget[w])}</div>;
};
