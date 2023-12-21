import { useState } from "react";

export function Menu() {
	const menuItems = [
		{
			label: "Panoramica",
			url: "/",
		},
		{
			label: "Misure",
			url: "/",
		},
		{
			label: "Progetti",
			url: "/",
		},
	];

	const [activeItem] = useState("Panoramica"); // Puoi impostare lo stato iniziale in base al percorso corrente

	return (
		<>
			<nav className="hidden whitespace-nowrap lg:ml-8 lg:flex">
				<ul>
					{menuItems.map((item) => (
						<li
							className={`${activeItem === item.label ? "rounded bg-primary-2 px-4 py-2" : ""} mr-6 inline-block`}
							key={item.label}
						>
							<a
								style={{ color: `rgb(var(--${activeItem === item.label ? "base-white" : "primary-2"}))` }}
								href={item.url}
								className="text-base font-semibold"
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
			<nav className="mt-5 flex flex-col lg:hidden">
				<ul className="flex flex-col">
					{menuItems.map((item) => (
						<li
							className={`${
								activeItem === item.label ? "rounded bg-primary-2  py-2" : ""
							} border-primary-4 mb-2 inline-block rounded border-2 px-4 py-5`}
							key={item.label}
						>
							<a
								style={{ color: `rgb(var(--${activeItem === item.label ? "base-white" : "primary-2"}))` }}
								href={item.url}
								className="text-base font-semibold"
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
