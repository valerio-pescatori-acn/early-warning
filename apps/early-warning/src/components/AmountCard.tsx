import { Card } from "@ew/ui/Card";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useSnapshot } from "valtio";
import { loaderVariants, widgetVariants } from "../utils/animation.utils";
import { store } from "../utils/store/store";
import { abbreviaImporto } from "../utils/string-utils";

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
					<div className="border-primary-5 rounded border p-8">
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
		<motion.div variants={widgetVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
			{formattedAmound && (
				<Card amount={formattedAmound.valore} unit={formattedAmound.unita} description="Importo rata" icon="euro" />
			)}
		</motion.div>
	);
};
