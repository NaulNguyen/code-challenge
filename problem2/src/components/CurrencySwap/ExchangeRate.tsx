import { Box, Typography } from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { styles } from "./styles";

interface ExchangeRateProps {
    fromCurrency: string;
    toCurrency: string;
    getExchangeRate: () => number | null;
    formatCurrencyAmount: (amount: number) => string;
}

const ExchangeRate = ({
    fromCurrency,
    toCurrency,
    getExchangeRate,
    formatCurrencyAmount,
}: ExchangeRateProps) => {
    return (
        <Box sx={styles.exchangeRate}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                    color: "primary.main",
                }}
            >
                <InfoOutlineIcon sx={{ fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                    Exchange Rate
                </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "primary.dark" }}>
                1 {fromCurrency} = {formatCurrencyAmount(getExchangeRate()!)}{" "}
                {toCurrency}
            </Typography>
        </Box>
    );
};

export default ExchangeRate;
