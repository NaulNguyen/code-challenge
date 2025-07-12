import { Box, Button, CircularProgress, Typography } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

interface SwapButtonProps {
    fromCurrency: string;
    toCurrency: string;
    amount: string;
    isLoading: boolean;
    handleSwap: () => void;
    validationError?: string;
}

const SwapButton = ({
    fromCurrency,
    toCurrency,
    amount,
    isLoading,
    handleSwap,
    validationError,
}: SwapButtonProps) => {
    return (
        <Button
            variant="contained"
            onClick={handleSwap}
            disabled={
                !fromCurrency ||
                !toCurrency ||
                !amount ||
                isLoading ||
                !!validationError
            }
            sx={{
                py: 2,
                background: "linear-gradient(90deg, #2563EB 0%, #4F46E5 100%)",
                "&:hover": {
                    background:
                        "linear-gradient(90deg, #1E40AF 0%, #3730A3 100%)",
                },
                "&.Mui-disabled": {
                    background:
                        "linear-gradient(90deg, #94A3B8 0%, #CBD5E1 100%)",
                    opacity: 0.8,
                    "& .MuiTypography-root": {
                        color: "rgba(255, 255, 255, 0.8)",
                    },
                    "& .MuiCircularProgress-root": {
                        color: "rgba(255, 255, 255, 0.8)",
                    },
                },
                textTransform: "none",
                "& .MuiTypography-root": {
                    color: "white",
                    fontWeight: 500,
                },
            }}
        >
            {isLoading ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <CircularProgress size={20} sx={{ color: "inherit" }} />
                    <Typography>Processing...</Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <SwapVertIcon sx={{ color: "white" }} />
                    <Typography>Swap Currencies</Typography>
                </Box>
            )}
        </Button>
    );
};

export default SwapButton;
