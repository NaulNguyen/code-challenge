import { Box, Button, CircularProgress, Typography, Grow } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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
    const isEnabled =
        fromCurrency && toCurrency && amount && !isLoading && !validationError;

    return (
        <Grow in timeout={500}>
            <Button
                variant="contained"
                onClick={handleSwap}
                disabled={!isEnabled}
                sx={{
                    py: 2.5,
                    px: 4,
                    borderRadius: 4,
                    position: "relative",
                    overflow: "hidden",
                    background: isEnabled
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)",
                    boxShadow: isEnabled
                        ? "0 8px 32px rgba(102, 126, 234, 0.4)"
                        : "0 4px 12px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                        transition: "left 0.6s",
                    },
                    "&:hover": {
                        ...(isEnabled && {
                            transform: "translateY(-2px)",
                            boxShadow: "0 12px 40px rgba(102, 126, 234, 0.5)",
                            background:
                                "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                            "&::before": {
                                left: "100%",
                            },
                        }),
                    },
                    "&:active": {
                        ...(isEnabled && {
                            transform: "translateY(0px)",
                            transition: "all 0.1s",
                        }),
                    },
                    "&.Mui-disabled": {
                        color: "rgba(0, 0, 0, 0.4)",
                        "& .MuiTypography-root": {
                            color: "rgba(0, 0, 0, 0.4)",
                        },
                    },
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                }}
            >
                {isLoading ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        <CircularProgress
                            size={24}
                            sx={{
                                color: "white",
                                animation: "spin 1s linear infinite",
                                "@keyframes spin": {
                                    "0%": { transform: "rotate(0deg)" },
                                    "100%": { transform: "rotate(360deg)" },
                                },
                            }}
                        />
                        <Typography sx={{ color: "white", fontWeight: 700 }}>
                            Processing Swap...
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        {isEnabled ? (
                            <TrendingUpIcon
                                sx={{
                                    color: "white",
                                    animation: isEnabled
                                        ? "pulse 2s ease-in-out infinite"
                                        : "none",
                                    "@keyframes pulse": {
                                        "0%, 100%": { transform: "scale(1)" },
                                        "50%": { transform: "scale(1.1)" },
                                    },
                                }}
                            />
                        ) : (
                            <SwapVertIcon
                                sx={{ color: "rgba(0, 0, 0, 0.4)" }}
                            />
                        )}
                        <Typography
                            sx={{
                                color: isEnabled
                                    ? "white"
                                    : "rgba(0, 0, 0, 0.4)",
                                fontWeight: 700,
                                textShadow: isEnabled
                                    ? "0 2px 4px rgba(0, 0, 0, 0.2)"
                                    : "none",
                            }}
                        >
                            {isEnabled
                                ? "Execute Swap"
                                : "Select Currencies & Amount"}
                        </Typography>
                    </Box>
                )}
            </Button>
        </Grow>
    );
};

export default SwapButton;
