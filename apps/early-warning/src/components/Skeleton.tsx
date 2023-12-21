import { AnimatePresence, motion } from "framer-motion";
import { loaderVariants } from "../utils/animation.utils";

export const Skeleton = () => (
	<AnimatePresence>
		<motion.div
			variants={loaderVariants}
			animate="start"
			initial="initial"
			transition={{ yoyo: Infinity, duration: 0.8 }}
		>
			<div className="rounded border border-primary-5 p-8">
				<div className="flex animate-pulse space-x-4">
					<div className="h-12 w-12 rounded-full bg-gray-300"></div>
					<div className="flex-1 space-y-4 py-1">
						<div className="h-4 w-3/4 rounded bg-gray-300"></div>
						<div className="space-y-2">
							<div className="h-4 rounded bg-gray-300"></div>
							<div className="h-4 w-5/6 rounded bg-gray-300"></div>
						</div>
					</div>
				</div>
				<div className="mt-8 flex animate-pulse space-x-4">
					<div className="h-12 w-12 rounded-full bg-gray-300"></div>
					<div className="flex-1 space-y-4 py-1">
						<div className="h-4 w-3/4 rounded bg-gray-300"></div>
						<div className="space-y-2">
							<div className="h-4 rounded bg-gray-300"></div>
							<div className="h-4 w-5/6 rounded bg-gray-300"></div>
						</div>
					</div>
				</div>
				<div className="mt-8 flex animate-pulse space-x-4">
					<div className="h-12 w-12 rounded-full bg-gray-300"></div>
					<div className="flex-1 space-y-4 py-1">
						<div className="h-4 w-3/4 rounded bg-gray-300"></div>
						<div className="space-y-2">
							<div className="h-4 rounded bg-gray-300"></div>
							<div className="h-4 w-5/6 rounded bg-gray-300"></div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	</AnimatePresence>
);
