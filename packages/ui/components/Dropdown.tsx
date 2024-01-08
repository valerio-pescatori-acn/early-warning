import React, { useState } from "react";

export type DropdownItem = {
	key: string;
	value: string;
};

export type DropdownProps = {
	label?: string;
	items: DropdownItem[];
	onChange: (item: string) => void;
};
export const Dropdown: React.FC<DropdownProps> = ({ label, items, onChange }) => {
	const [selectedValue, setSelectedValue] = useState<string>("");

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedValue(value);
		onChange(value);
	};

	return (
		<div>
			{label && <label className="mr-4">{label}</label>}
			<select
				value={selectedValue}
				onChange={handleChange}
				className="border-primary text-primary w-full rounded border bg-white px-4 py-5 font-semibold lg:w-64 lg:truncate lg:p-2 lg:py-2.5"
			>
				{items.map((item) => (
					<option key={item.key} value={item.value}>
						{item.value}
					</option>
				))}
			</select>
		</div>
	);
};
