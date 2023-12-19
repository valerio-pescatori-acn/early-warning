import { Installment } from "./types/installment";

export const abbreviaImporto = (importo: string) => {
	// Rimuove eventuali caratteri non numerici (escluso il punto per i decimali)
	const importoPulito = importo.replace(/[^0-9.]/g, "");

	// Converte la stringa in un numero
	const valore = parseFloat(importoPulito);

	// Controllo se il valore è un numero valido
	if (isNaN(valore)) {
		return { valore: "0", unita: "Importo non valido" };
	}

	// Calcola l'abbreviazione e l'unità
	let valoreAbbreviato;
	let unita;
	if (valore >= 1e9) {
		// Miliardi
		valoreAbbreviato = (valore / 1e9).toFixed(2);
		unita = "mld";
	} else if (valore >= 1e6) {
		// Milioni
		valoreAbbreviato = (valore / 1e6).toFixed(2);
		unita = "mln";
	} else if (valore >= 1e3) {
		// Migliaia
		valoreAbbreviato = (valore / 1e3).toFixed(2);
		unita = "k";
	} else {
		valoreAbbreviato = valore.toFixed(2);
		unita = "";
	}

	return { valore: valoreAbbreviato, unita: unita };
};

const getInstallmentNumberDate = (period: string) => {
	const periodRegEx = /(\d+)a rata: (\d{4})[\s\S]*(\d)° /;
	const result = periodRegEx.exec(period);
	if (!result) throw new Error(`Formato periodo rata non valido: '${period}'`);
	return {
		installmentNumber: result[1],
		year: result[2],
		semester: result[3],
	};
};

export const sortInstallments = (a: Installment, b: Installment): number => {
	const aData = getInstallmentNumberDate(a.period);
	const bData = getInstallmentNumberDate(b.period);
	if (aData.year < bData.year) return -1;
	if (aData.year > bData.year) return 1;
	if (aData.installmentNumber < bData.installmentNumber) return -1;
	if (aData.installmentNumber > bData.installmentNumber) return 1;
	if (aData.semester < bData.semester) return -1;
	if (aData.semester > bData.semester) return 1;
	return 0;
};
