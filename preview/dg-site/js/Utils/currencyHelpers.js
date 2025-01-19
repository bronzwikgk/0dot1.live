
// Region to Currency Map
const regionCurrencyMap = {
    india: { currency: 'INR', locale: 'en-IN' },
    region_3_usd: { currency: 'USD', locale: 'en-US' },
    region_2_usd: { currency: 'USD', locale: 'en-US' },
    region_2_euro: { currency: 'EUR', locale: 'de-DE' },
    uk: { currency: 'GBP', locale: 'en-GB' },
    region_1_usa: { currency: 'USD', locale: 'en-US' },
};

// Function to fetch locale and currency based on region
function getLocaleAndCurrency(region) {
    const regionData = regionCurrencyMap[region];
    if (!regionData) {
        throw new Error(`Region "${region}" is not supported.`);
    }
    return regionData;
}

function formatCurrency(amount, currency, locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency
    }).format(amount);
}
const { currency, locale } = getLocaleAndCurrency(region);