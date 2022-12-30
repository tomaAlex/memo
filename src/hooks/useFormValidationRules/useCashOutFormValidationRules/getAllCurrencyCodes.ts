import CurrencyList from "currency-list";

const getAllCurrencyCodes = (): string[] => {
	const allCurrencies = CurrencyList.getAll();
	const allCurrencyKeys = Object.keys(allCurrencies);
	const currencyCodes = new Set<string>();
	for (const currencyKey of allCurrencyKeys) {
		const currency = allCurrencies[currencyKey];
		Object.keys(currency).forEach((currencyCode) => {
			const isItValidCurrencyCode = currencyCode.length === 3;
			if (!isItValidCurrencyCode) {
				return;
			}
			currencyCodes.add(currencyCode);
		});
	}
	return Array.from(currencyCodes);
};

export default getAllCurrencyCodes;
