import { RiskEnum } from "../enum/RiskEnum";
import { MilestoneTarget } from "./milestone-target";

export type Measurement = {
	id: string;
	period: string;
	name: string;
	administrationCode: string;
	administrationName: string;
	risk: RiskEnum;
	to_ind_seq: { results: MilestoneTarget[] };
};
