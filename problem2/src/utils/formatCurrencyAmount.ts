export const formatCurrencyAmount = (
  amount: string | number,
  options?: {
    locale?: string;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    useGrouping?: boolean; 
  }
): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) return '0';

  const {
    locale = 'en-US',
    maximumFractionDigits = 8,
    minimumFractionDigits = 0,
    useGrouping = true,
  } = options || {};

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping
  }).format(num);
};
