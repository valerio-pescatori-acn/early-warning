import { useSnapshot } from "valtio";
import Dropdown, { DropdownItem } from "./Dropdown";
import { LogoSection } from "./LogoSection";
import { Menu } from "./Menu";
import { Userinfo } from "./Userinfo";
import { store } from "../utils/store/store";
import { useMemo, useState } from "react";
import { Icons } from "./Icon";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowScroll } from "@uidotdev/usehooks";

export function Header() {
	const { availableInstallments } = useSnapshot(store);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [{ y }] = useWindowScroll();

	const smallMobileHeader = useMemo(() => y && y > 50, [y]);

	const dropdownItems = useMemo(
		() =>
			availableInstallments?.map<DropdownItem>((item) => ({
				key: item.period,
				value: item.period,
			})),
		[availableInstallments],
	);

	const handleDropdownChange = (value: string, mobile = false) => {
		const found = store.availableInstallments?.find((item) => item.period === value);
		if (!found) return;
		store.selectedInstallment = found;
		if (mobile) toggleOverlay();
	};

	const toggleOverlay = () => setIsMenuOpen(!isMenuOpen);

	const HeaderMobile = () => (
		<header className="contents lg:hidden">
			<div
				className={`${
					!isMenuOpen ? "fixed top-0 z-10 mb-4 w-full rounded-b-lg shadow-xl" : ""
				} flex-column col-span-12 flex items-center justify-between bg-white px-6 transition-all ${
					smallMobileHeader ? "py-2" : "py-7"
				}`}
			>
				<LogoSection />
				<div onClick={() => toggleOverlay()}>
					<AnimatePresence mode="wait">
						{isMenuOpen ? (
							<motion.div
								key="close"
								initial={{ opacity: 0, rotate: -180 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0, rotate: 180 }}
								transition={{ duration: 0.5 }}
							>
								<Icons.close />
							</motion.div>
						) : (
							<motion.div
								key="burger"
								initial={{ opacity: 0, rotate: 180 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0, rotate: -180 }}
								transition={{ duration: 0.5 }}
							>
								<Icons.burger />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</header>
	);

	return (
		<>
			<header className="col-span-12 hidden h-11 items-center justify-between lg:flex">
				<div className="flex items-center">
					<LogoSection />
					<Menu />
				</div>
				<div className="flex items-center">
					{dropdownItems && (
						<Dropdown label="Periodo di rendicontazione" items={dropdownItems} onChange={handleDropdownChange} />
					)}
				</div>
				<Userinfo />
			</header>
			{HeaderMobile()}
			{isMenuOpen && (
				<AnimatePresence>
					<motion.div
						className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-white"
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
					>
						<div className="h-full w-full rounded bg-white px-4 shadow-lg">
							{HeaderMobile()}

							<motion.div
								initial={{ x: -100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.4, duration: 0.4 }}
								className="border-t-2 border-t-primary-1"
							>
								<Menu />
							</motion.div>
							<motion.div
								initial={{ x: -100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.6, duration: 0.4 }}
							>
								<div className="mt-10">Periodo di rendicontazione</div>
								<div className="mt-4">
									{dropdownItems && (
										<Dropdown items={dropdownItems} onChange={(value) => handleDropdownChange(value, true)} />
									)}
								</div>
							</motion.div>
							<motion.div
								initial={{ x: -100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.8, duration: 0.4 }}
								className="mt-10"
							>
								<Userinfo />
							</motion.div>
						</div>
					</motion.div>
				</AnimatePresence>
			)}
		</>
	);
}
