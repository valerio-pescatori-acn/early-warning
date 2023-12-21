import { FC } from "react";

export interface Tab {
	id: string;
	nome: string;
}

interface TabMenuProps {
	tabs: Tab[];
	activeTab: string;
	onTabChange: (tabId: string) => void;
}

const TabMenu: FC<TabMenuProps> = ({ tabs, activeTab, onTabChange }) => (
	<div>
		<div className="flex justify-around">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					className={`px-4 py-2 font-semibold  ${
						activeTab === tab.id ? "border-b-2 border-blue-dark font-bold text-blue-dark" : "text-primary-2"
					}`}
					onClick={() => onTabChange(tab.id)}
				>
					{tab.nome}
				</button>
			))}
		</div>
		<div className="p-4"></div>
	</div>
);

export default TabMenu;
