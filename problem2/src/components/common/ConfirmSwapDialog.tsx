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
                    borderRadius: 3,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    background:
                        "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                },
            }}
            TransitionComponent={Grow}
            TransitionProps={{ timeout: 400 }}
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    pb: 1,
                    background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    position: "relative",
                    "& .MuiTypography-root": {
                        fontWeight: 600,
                        fontSize: "1.25rem",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                    }}
                >
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
                                gap: 1,
                            }}
                        >
                            <Avatar
                                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${fromCurrency}.svg`}
                                sx={{ width: 24, height: 24 }}
                            />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
                            my: 2,
                        }}
                    >
                        <Box
                            sx={{
                                padding: "8px 10px",
                                bgcolor: "white",
                                borderRadius: "50%",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                        >
                            <SwapVertIcon
                                sx={{
                                    color: "primary.main",
                                    fontSize: 20,
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
                                gap: 1,
                            }}
                        >
                            <Avatar
                                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${toCurrency}.svg`}
                                sx={{ width: 24, height: 24 }}
                            />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {formatCurrencyAmount(receiveAmount.toString())}{" "}
                                {toCurrency}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Exchange Rate Info */}
                <Box
                    sx={{
                        p: 2,
                        bgcolor: "rgba(37, 99, 235, 0.05)",
                        borderRadius: 1,
                        border: "1px solid rgba(37, 99, 235, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
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
                        p: 2,
                        bgcolor: "rgba(255, 193, 7, 0.05)",
                        borderRadius: 1,
                        border: "1px solid rgba(255, 193, 7, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Typography
                        variant="caption"
                        color="warning.main"
                        sx={{ fontWeight: 500 }}
                    >
                        ⚠️ This action cannot be undone
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    p: 3,
                    gap: 2,
                    background:
                        "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
                    borderTop: "1px solid #e2e8f0",
                }}
            >
                <Button
                    onClick={() => setConfirmOpen(false)}
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        textTransform: "none",
                        borderColor: "grey.300",
                        color: "text.secondary",
                        "&:hover": {
                            borderColor: "grey.400",
                            bgcolor: "grey.50",
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={confirmSwap}
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1,
                        textTransform: "none",
                        background:
                            "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
                        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                        "&:hover": {
                            background:
                                "linear-gradient(135deg, #1E40AF 0%, #3730A3 100%)",
                            boxShadow: "0 6px 16px rgba(37, 99, 235, 0.4)",
                            transform: "translateY(-1px)",
                        },
                        transition: "all 0.2s ease",
                    }}
                >
                    Confirm Swap
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmSwapDialog;
