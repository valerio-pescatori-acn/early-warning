import { MilestoneTargetEnum } from "../enum/MilestoneTargetEnum";
import { RiskEnum } from "../enum/RiskEnum";

export type MilestoneTarget = {
	id: string;
	// zz_ind_seq_n: string;
	period: string;
	status: string;
	name: string;
	code: string;
	risk: RiskEnum;
	type: MilestoneTargetEnum;
	trustIndex: string;
};
