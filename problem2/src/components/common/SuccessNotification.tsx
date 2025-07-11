import {
    Alert,
    Avatar,
    Box,
    keyframes,
    Snackbar,
    Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

interface SuccessNotificationProps {
    openNotification: boolean;
    handleCloseNotification: () => void;
    amount: string;
    fromCurrency: string;
    receiveAmount: string;
    toCurrency: string;
    formatCurrencyAmount: (amount: string) => string;
}

const SuccessNotification = ({
    openNotification,
    handleCloseNotification,
    amount,
    fromCurrency,
    receiveAmount,
    toCurrency,
    formatCurrencyAmount,
}: SuccessNotificationProps) => {
    return (
        <Snackbar
            open={openNotification}
            autoHideDuration={4000}
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{
                "& .MuiSnackbar-root": {
                    transition: "all 0.3s ease-in-out",
                },
            }}
        >
            <Alert
                onClose={handleCloseNotification}
                severity="success"
                variant="outlined"
                sx={{
                    width: "100%",
                    minWidth: 300,
                    animation: `${slideIn} 0.5s ease`,
                    backgroundColor: "white",
                    borderColor: "success.main",
                    borderWidth: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    "& .MuiAlert-icon": {
                        color: "success.main",
                        fontSize: 28,
                        padding: 0.5,
                    },
                    "& .MuiAlert-message": {
                        color: "success.main",
                    },
                    "& .MuiAlert-action .MuiIconButton-root": {
                        color: "success.main",
                    },
                }}
                icon={<CheckCircleOutlineIcon fontSize="large" />}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: "success.main",
                    }}
                >
                    Swap Completed!
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                    }}
                >
                    <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                        <Avatar
                            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${fromCurrency}.svg`}
                            sx={{ width: 20, height: 20 }}
                        />
                        <Typography variant="body2" color="text.primary">
                            {formatCurrencyAmount(amount)} {fromCurrency}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        →
                    </Typography>

                    <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                        <Avatar
                            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${toCurrency}.svg`}
                            sx={{ width: 20, height: 20 }}
                        />
                        <Typography variant="body2" color="text.primary">
                            {formatCurrencyAmount(receiveAmount)} {toCurrency}
                        </Typography>
                    </Box>
                </Box>
            </Alert>
        </Snackbar>
    );
};

export default SuccessNotification;
