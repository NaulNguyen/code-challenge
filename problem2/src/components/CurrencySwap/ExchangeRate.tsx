import { Box, Typography, Chip, Fade } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { styles } from "./styles";

interface ExchangeRateProps {
    fromCurrency: string;
    toCurrency: string;
    getExchangeRate: () => number | null;
    formatCurrencyAmount: (amount: string) => string;
}

const ExchangeRate = ({
    fromCurrency,
    toCurrency,
    getExchangeRate,
    formatCurrencyAmount,
}: ExchangeRateProps) => {
    const rate = getExchangeRate();

    return (
        <Fade in timeout={500}>
            <Box sx={styles.exchangeRate}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1.5,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TrendingUpIcon
                            sx={{
                                fontSize: 20,
                                color: "primary.main",
                                animation: "pulse 2s ease-in-out infinite",
                                "@keyframes pulse": {
                                    "0%, 100%": { opacity: 1 },
                                    "50%": { opacity: 0.7 },
                                },
                            }}
                        />
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                color: "primary.main",
                            }}
                        >
                            Live Exchange Rate
                        </Typography>
                    </Box>
                    <Chip
                        label="LIVE"
                        size="small"
                        sx={{
                            background:
                                "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.65rem",
                            height: 20,
                            animation: "blink 2s ease-in-out infinite",
                            "@keyframes blink": {
                                "0%, 100%": { opacity: 1 },
                                "50%": { opacity: 0.8 },
                            },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 1,
                        px: 2,
                        borderRadius: 2,
                        background: "rgba(255, 255, 255, 0.7)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            color: "primary.dark",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            textAlign: "center",
                        }}
                    >
                        1 {fromCurrency} ={" "}
                        {formatCurrencyAmount(rate?.toString() || "0")}{" "}
                        {toCurrency}
                    </Typography>
                </Box>
            </Box>
        </Fade>
    );
};

export default ExchangeRate;
