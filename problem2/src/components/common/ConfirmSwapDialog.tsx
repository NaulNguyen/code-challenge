import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grow,
    Typography,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import InfoIcon from "@mui/icons-material/Info";
import { formatCurrencyAmount } from "../../utils/formatCurrencyAmount";

interface ConfirmSwapDialogProps {
    confirmOpen: boolean;
    setConfirmOpen: (open: boolean) => void;
    fromCurrency: string;
    toCurrency: string;
    amount: number;
    receiveAmount: number;
    confirmSwap: () => void;
    exchangeRate?: number; // Add exchange rate prop
}

const ConfirmSwapDialog = ({
    confirmOpen,
    setConfirmOpen,
    fromCurrency,
    toCurrency,
    amount,
    receiveAmount,
    confirmSwap,
    exchangeRate, // Add to destructuring
}: ConfirmSwapDialogProps) => {
    // Calculate exchange rate from amount and receiveAmount if not provided
    const getExchangeRate = (): number => {
        if (exchangeRate) return exchangeRate;
        if (amount && receiveAmount) {
            return receiveAmount / amount;
        }
        return 0;
    };

    return (
        <Dialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 5,
                    boxShadow:
                        "0 25px 50px rgba(102, 126, 234, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1)",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    overflow: "hidden",
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            "linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.02) 100%)",
                        zIndex: -1,
                    },
                },
            }}
            TransitionComponent={Grow}
            TransitionProps={{ timeout: 600 }}
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    py: 3,
                    background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                    color: "white",
                    position: "relative",
                    "& .MuiTypography-root": {
                        fontWeight: 700,
                        fontSize: "1.4rem",
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                    },
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "60%",
                        height: "3px",
                        background:
                            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)",
                        borderRadius: "2px",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                    }}
                >
                    <SwapVertIcon
                        sx={{
                            fontSize: 28,
                            animation: "pulse 2s ease-in-out infinite",
                            "@keyframes pulse": {
                                "0%, 100%": { opacity: 1 },
                                "50%": { opacity: 0.7 },
                            },
                        }}
                    />
                    Confirm Swap
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                {/* Swap Details Card */}
                <Box
                    sx={{
                        p: 3,
                        background:
                            "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                        borderRadius: 2,
                        border: "1px solid #e2e8f0",
                        position: "relative",
                        mt: 2,
                        mb: 3,
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            background:
                                "linear-gradient(90deg, #2563EB 0%, #4F46E5 100%)",
                            borderRadius: "2px 2px 0 0",
                        },
                    }}
                >
                    {/* From Currency */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            From
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Avatar
                                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${fromCurrency}.svg`}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    border: "2px solid",
                                    borderColor: "primary.main",
                                    background:
                                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    "& img": {
                                        objectFit: "contain",
                                    },
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    background:
                                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {formatCurrencyAmount(amount.toString())}{" "}
                                {fromCurrency}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Arrow with Animation */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            my: 3,
                        }}
                    >
                        <Box
                            sx={{
                                p: 2,
                                background:
                                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                borderRadius: "50%",
                                boxShadow:
                                    "0 8px 32px rgba(102, 126, 234, 0.4)",
                                position: "relative",
                                animation: "bounce 2s ease-in-out infinite",
                                "@keyframes bounce": {
                                    "0%, 100%": {
                                        transform: "translateY(0px)",
                                    },
                                    "50%": { transform: "translateY(-4px)" },
                                },
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    inset: "2px",
                                    borderRadius: "50%",
                                    background:
                                        "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)",
                                },
                            }}
                        >
                            <SwapVertIcon
                                sx={{
                                    color: "white",
                                    fontSize: 24,
                                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                                }}
                            />
                        </Box>
                    </Box>

                    {/* To Currency */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            To
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Avatar
                                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${toCurrency}.svg`}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    border: "2px solid",
                                    borderColor: "success.main",
                                    background:
                                        "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
                                    "& img": {
                                        objectFit: "contain",
                                    },
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    background:
                                        "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {formatCurrencyAmount(receiveAmount.toString())}{" "}
                                {toCurrency}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Exchange Rate Info */}
                <Box
                    sx={{
                        p: 3,
                        background:
                            "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.05) 100%)",
                        borderRadius: 3,
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 3,
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            borderRadius: 3,
                            background:
                                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)",
                            pointerEvents: "none",
                        },
                    }}
                >
                    <InfoIcon
                        sx={{
                            color: "primary.main",
                            fontSize: 20,
                        }}
                    />
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Exchange Rate
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            1 {fromCurrency} ={" "}
                            {formatCurrencyAmount(getExchangeRate().toString())}{" "}
                            {toCurrency}
                        </Typography>
                    </Box>
                </Box>

                {/* Warning Notice */}
                <Box
                    sx={{
                        p: 2.5,
                        background:
                            "linear-gradient(135deg, rgba(255, 193, 7, 0.08) 0%, rgba(255, 152, 0, 0.05) 100%)",
                        borderRadius: 3,
                        border: "1px solid rgba(255, 193, 7, 0.3)",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            borderRadius: 3,
                            background:
                                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)",
                            pointerEvents: "none",
                        },
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            color: "warning.main",
                            textAlign: "center",
                            fontSize: "0.9rem",
                        }}
                    >
                        ⚠️ This action cannot be undone
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    p: 4,
                    gap: 3,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    borderTop: "1px solid rgba(102, 126, 234, 0.1)",
                }}
            >
                <Button
                    onClick={() => setConfirmOpen(false)}
                    variant="outlined"
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "grey.300",
                        color: "text.secondary",
                        backdropFilter: "blur(10px)",
                        "&:hover": {
                            borderColor: "grey.400",
                            bgcolor: "rgba(0, 0, 0, 0.04)",
                            transform: "translateY(-1px)",
                        },
                        transition: "all 0.2s ease",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={confirmSwap}
                    variant="contained"
                    sx={{
                        borderRadius: 3,
                        px: 5,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 700,
                        background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                        position: "relative",
                        overflow: "hidden",
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
                            background:
                                "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                            boxShadow: "0 12px 40px rgba(102, 126, 234, 0.5)",
                            transform: "translateY(-2px)",
                            "&::before": {
                                left: "100%",
                            },
                        },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    Confirm Swap
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmSwapDialog;
