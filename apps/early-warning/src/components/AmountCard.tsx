import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useSnapshot } from "valtio";
import { store } from "../utils/store/store";
import { abbreviaImporto } from "../utils/string-utils";
import { Icons } from "./Icon";
import { AnimatedText } from "./AnimatedText";
import { loaderVariants, widgetVariants } from "../utils/animation.utils";

export const AmountCard = () => {
	const [isLoading] = useState(false);
	const { selectedInstallment } = useSnapshot(store);

	const formattedAmound = useMemo(
		() => selectedInstallment && abbreviaImporto(selectedInstallment.amount),
		[selectedInstallment],
	);

	if (isLoading) {
		// Mostra il loader durante il caricamento dei dati
		return (
			<AnimatePresence>
				<motion.div
					variants={loaderVariants}
					animate="start"
					initial="initial"
					transition={{ yoyo: Infinity, duration: 0.8 }}
				>
					<div className="rounded border border-primary-5 p-8">
						<div className="flex animate-pulse space-x-4">
							<div className="h-12 w-12 rounded-full bg-gray-300" />
							<div className="flex-1 space-y-4 py-1">
								<div className="h-4 w-3/4 rounded bg-gray-300" />
								<div className="space-y-2">
									<div className="h-4 rounded bg-gray-300" />
									<div className="h-4 w-5/6 rounded bg-gray-300" />
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		);
	}

	return (
		<motion.div
			variants={widgetVariants}
			initial="hidden"
			animate="visible"
			transition={{ duration: 0.5 }}
			className="flex items-center justify-between rounded-lg bg-primary-1 px-6 py-4  text-white shadow-md lg:flex-col lg:items-baseline lg:justify-start lg:px-8 lg:py-6"
		>
			<div className="flex items-center ">
				<Icons.euro />
				{formattedAmound && (
					<>
						<AnimatedText
							el="span"
							text={`€ ${formattedAmound.valore}`}
							className="ml-4 mr-2 text-2xl font-bold lg:mx-4 lg:text-3xl"
						/>
						<AnimatedText el="span" text={formattedAmound.unita} className="text-2xl font-light lg:text-3xl" />
					</>
				)}
			</div>

			<div className="text-base lg:mt-4 lg:text-2xl">Importo rata</div>
		</motion.div>
	);
};
