const PANEL_CAPACITY = 0.5; // Assuming each panel has 500W capacity.
const PANEL_SIZE = 2 * 1; // Assuming panel size is 2m x 1m.
const CAPITAL_FOR_1KW = 60000; // Assuming capital required for 1kW solar is 60000.
const EARNING_YEARS = 25;

export const calculate = (avgMonthBill) => {
  const numberOfPanels = Math.ceil(avgMonthBill / 420);
  const rooftopSolarArea = numberOfPanels * PANEL_SIZE;
  const capitalNeeded = PANEL_CAPACITY * CAPITAL_FOR_1KW * numberOfPanels;
  const breakEvenYears = Number(
    (capitalNeeded / (avgMonthBill * 12)).toFixed(2)
  ); // In 12 months
  const earning = avgMonthBill * 12 * EARNING_YEARS - capitalNeeded; // In 12 months

  return {
    numberOfPanels,
    rooftopSolarArea,
    capitalNeeded,
    breakEvenYears,
    earning,
  };
};
