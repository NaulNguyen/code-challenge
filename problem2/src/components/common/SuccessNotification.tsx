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
    transform: translateX(100%) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
`;

const celebration = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
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
            autoHideDuration={5000}
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{
                "& .MuiSnackbar-root": {
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                mt: 2,
                mr: 2,
            }}
        >
            <Alert
                onClose={handleCloseNotification}
                severity="success"
                variant="outlined"
                sx={{
                    width: "100%",
                    minWidth: 350,
                    maxWidth: 400,
                    animation: `${slideIn} 0.6s ease, ${celebration} 0.8s ease 0.6s`,
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    borderColor: "success.main",
                    borderWidth: 2,
                    borderRadius: 4,
                    boxShadow:
                        "0 20px 40px rgba(76, 175, 80, 0.2), 0 8px 32px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-200px",
                        width: "200px",
                        height: "100%",
                        background:
                            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                        animation: `${shimmer} 2s infinite`,
                    },
                    "& .MuiAlert-icon": {
                        color: "success.main",
                        fontSize: 32,
                        padding: 0.5,
                        animation: `${celebration} 1s ease infinite`,
                    },
                    "& .MuiAlert-message": {
                        color: "success.main",
                        width: "100%",
                    },
                    "& .MuiAlert-action .MuiIconButton-root": {
                        color: "success.main",
                        "&:hover": {
                            bgcolor: "rgba(76, 175, 80, 0.1)",
                        },
                    },
                }}
                icon={<CheckCircleOutlineIcon fontSize="large" />}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        background:
                            "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textAlign: "center",
                        fontSize: "1.2rem",
                    }}
                >
                    🎉 Swap Completed Successfully!
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        mt: 1.5,
                        p: 2,
                        background:
                            "linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(46, 125, 50, 0.05) 100%)",
                        borderRadius: 3,
                        border: "1px solid rgba(76, 175, 80, 0.2)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar
                            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${fromCurrency}.svg`}
                            sx={{
                                width: 28,
                                height: 28,
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
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                color: "primary.main",
                            }}
                        >
                            {formatCurrencyAmount(amount)} {fromCurrency}
                        </Typography>
                    </Box>

                    <Typography
                        variant="h6"
                        sx={{
                            color: "success.main",
                            fontWeight: 700,
                            animation: `${celebration} 1s ease infinite`,
                        }}
                    >
                        →
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar
                            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${toCurrency}.svg`}
                            sx={{
                                width: 28,
                                height: 28,
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
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                color: "success.main",
                            }}
                        >
                            {formatCurrencyAmount(receiveAmount)} {toCurrency}
                        </Typography>
                    </Box>
                </Box>
            </Alert>
        </Snackbar>
    );
};

export default SuccessNotification;
