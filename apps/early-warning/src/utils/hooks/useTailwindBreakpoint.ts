import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMemo } from "react";

export const useTailwindBreakpoint = () => {
	const {
		theme: { screens },
	} = resolveConfig(tailwindConfig);
	const { width } = useWindowSize();

	const matchedBreakpoint = useMemo(() => {
		if (!width) return null;
		const currentBp = Object.keys(screens)
			.filter((bp) => width >= parseInt(screens[bp as keyof typeof screens]))
			.sort((a, b) => parseInt(screens[a as keyof typeof screens]) - parseInt(screens[b as keyof typeof screens]))
			.pop();
		return currentBp ?? null;
	}, [width]);

	const bpGtThan = (bp: keyof typeof screens) => {
		if (!width) return false;
		return width >= parseInt(screens[bp]);
	};

	const bpLtThan = (bp: keyof typeof screens) => {
		if (!width) return false;
		return width < parseInt(screens[bp]);
	};

	const bpBetween = (bp1: keyof typeof screens, bp2: keyof typeof screens) => {
		if (!width) return false;
		return width >= parseInt(screens[bp1]) && width < parseInt(screens[bp2]);
	};

	const bpEqualTo = (bp: keyof typeof screens) => {
		if (!width) return false;
		return width === parseInt(screens[bp]);
	};

	return {
		matchedBreakpoint: matchedBreakpoint as keyof typeof screens | null,
		bpGtThan,
		bpLtThan,
		bpBetween,
		bpEqualTo,
	};
};
