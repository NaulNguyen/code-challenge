import { useState, useEffect, useCallback } from "react";
import {
    Box,
    Container,
    Card,
    Alert,
    IconButton,
    Skeleton,
    CircularProgress,
    Button,
    Typography,
    Tooltip,
    Grow,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { CurrencySelect } from "./CurrencySelect";
import { AmountInput } from "./AmountInput";
import SwapButton from "./SwapButton";
import ExchangeRate from "./ExchangeRate";
import { styles } from "./styles";
import axios from "axios";
import type { Price } from "../../types/price";
import { formatCurrencyAmount } from "../../utils/formatCurrencyAmount";
import Header from "./Header";
import StatusBar from "./StatusBar";
import SuccessNotification from "../common/SuccessNotification";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Footer from "./Footer";
import ConfirmSwapDialog from "../common/ConfirmSwapDialog";

const CurrencySwap = () => {
    const [prices, setPrices] = useState<Price[]>([]);
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [receiveAmount, setReceiveAmount] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState("");
    const [showValidation, setShowValidation] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const fetchPrices = useCallback(async () => {
        setIsLoading(true);
        setNetworkError(false);
        try {
            const response = await axios.get(
                "https://interview.switcheo.com/prices.json",
                { timeout: 10000 }
            );
            setPrices(response.data.filter((price: Price) => price.price > 0));
            setRetryCount(0);
        } catch (err) {
            setNetworkError(true);
            setError(
                `Failed to fetch prices. Please check your connection. ${
                    retryCount > 0 ? `(Retry ${retryCount})` : ""
                }`
            );
            setRetryCount((prev) => prev + 1);
        } finally {
            setIsLoading(false);
        }
    }, [retryCount]);

    useEffect(() => {
        fetchPrices();
    }, []);

    // Validation
    const validateAmount = useCallback((value: string): boolean => {
        if (!value) {
            setValidationError("Amount is required");
            return false;
        }
        if (Number(value) <= 0) {
            setValidationError("Amount must be greater than 0");
            return false;
        }
        if (Number(value) > 1000000) {
            setValidationError("Amount is too large");
            return false;
        }
        setValidationError("");
        return true;
    }, []);

    // Components
    const CurrencySelectSkeleton = () => (
        <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
    );

    const LoadingOverlay = () => (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                p: 4,
            }}
        >
            <CircularProgress size={40} />
            <Typography variant="body2" color="text.secondary">
                Loading prices...
            </Typography>
        </Box>
    );

    // Helper functions
    const getExchangeRate = useCallback(() => {
        if (!fromCurrency || !toCurrency) return null;

        const fromPrice =
            prices.find((p) => p.currency === fromCurrency)?.price || 0;
        const toPrice =
            prices.find((p) => p.currency === toCurrency)?.price || 0;

        if (fromPrice && toPrice) {
            return fromPrice / toPrice;
        }
        return null;
    }, [fromCurrency, toCurrency, prices]);

    const getPriceForCurrency = useCallback(
        (currency: string) => {
            return prices.find((p) => p.currency === currency)?.price || 0;
        },
        [prices]
    );

    // Event handlers
    const handleAmountChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/[^0-9.]/g, "");
            if (!isNaN(Number(value))) {
                setAmount(value);
                // Clear validation error when user starts typing
                if (showValidation && value) {
                    setValidationError("");
                }
            }
        },
        [showValidation]
    );

    const handleSwapPositions = useCallback(() => {
        if (!fromCurrency || !toCurrency) return;

        setShowValidation(true);
        if (!validateAmount(amount)) return;

        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }, [fromCurrency, toCurrency, amount, validateAmount]);

    const handleSwapClick = useCallback(() => {
        setShowValidation(true);
        if (!validateAmount(amount)) return;
        setConfirmOpen(true);
    }, [amount, validateAmount]);

    const confirmSwap = useCallback(() => {
        setConfirmOpen(false);
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setOpenNotification(true);

            // Reset form after success
            setTimeout(() => {
                setAmount("");
                setReceiveAmount("");
                setShowValidation(false);
            }, 4100);
        }, 1500);
    }, [fromCurrency, toCurrency, amount]);

    const handleCloseNotification = useCallback(() => {
        setOpenNotification(false);
    }, []);

    // Auto-calculate receive amount
    useEffect(() => {
        if (!amount || !fromCurrency || !toCurrency) {
            setReceiveAmount("");
            return;
        }

        const fromPrice = getPriceForCurrency(fromCurrency);
        const toPrice = getPriceForCurrency(toCurrency);

        if (fromPrice && toPrice) {
            const convertedAmount = (Number(amount) * fromPrice) / toPrice;
            setReceiveAmount(convertedAmount.toFixed(6));
        }
    }, [amount, fromCurrency, toCurrency, getPriceForCurrency]);

    // Retry function
    const handleRetry = useCallback(() => {
        fetchPrices();
    }, [fetchPrices]);

    return (
        <Box sx={styles.root}>
            <Container maxWidth="sm" sx={styles.container}>
                <Header />
                <Card
                    sx={{
                        ...styles.mobileCard,
                        borderRadius: 4,
                        overflow: "hidden",
                    }}
                >
                    <StatusBar />
                    <Box sx={{ p: 3 }}>
                        {/* Error Alert with Retry */}
                        {error && (
                            <Alert
                                severity="error"
                                sx={styles.alertError}
                                action={
                                    networkError && (
                                        <Button
                                            color="inherit"
                                            size="small"
                                            onClick={handleRetry}
                                        >
                                            Retry
                                        </Button>
                                    )
                                }
                            >
                                {error}
                            </Alert>
                        )}

                        {/* Loading State */}
                        {isLoading && !prices.length ? (
                            <LoadingOverlay />
                        ) : isLoading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <CurrencySelectSkeleton />
                                <Skeleton
                                    variant="rectangular"
                                    height={56}
                                    sx={{ borderRadius: 1 }}
                                />
                                <CurrencySelectSkeleton />
                                <Skeleton
                                    variant="rectangular"
                                    height={56}
                                    sx={{ borderRadius: 1 }}
                                />
                            </Box>
                        ) : (
                            <Grow in timeout={500}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                    }}
                                >
                                    <CurrencySelect
                                        id="from-currency"
                                        value={fromCurrency}
                                        onChange={setFromCurrency}
                                        label="From Currency"
                                        error={!fromCurrency}
                                        showValidation={showValidation}
                                        prices={prices}
                                    />

                                    <AmountInput
                                        value={amount}
                                        onChange={handleAmountChange}
                                        label="Amount to Send"
                                        currency={fromCurrency}
                                        error={validationError}
                                        showValidation={showValidation}
                                    />

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Tooltip title="Swap currencies (Ctrl+S)">
                                            <IconButton
                                                onClick={handleSwapPositions}
                                                disabled={
                                                    !fromCurrency || !toCurrency
                                                }
                                                sx={{
                                                    p: 2,
                                                    bgcolor: "white",
                                                    border: "2px solid",
                                                    borderColor: "grey.300",
                                                    borderRadius: "50%",
                                                    transition: "all 0.2s ease",
                                                    "&:hover:not(:disabled)": {
                                                        borderColor:
                                                            "primary.main",
                                                        bgcolor: "primary.50",
                                                        transform:
                                                            "rotate(180deg)",
                                                    },
                                                    "&:disabled": {
                                                        opacity: 0.5,
                                                        cursor: "not-allowed",
                                                        bgcolor: "grey.100",
                                                    },
                                                }}
                                            >
                                                <SwapVertIcon
                                                    sx={{
                                                        color:
                                                            !fromCurrency ||
                                                            !toCurrency
                                                                ? "grey.400"
                                                                : "grey.600",
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>

                                    <CurrencySelect
                                        id="to-currency"
                                        value={toCurrency}
                                        onChange={setToCurrency}
                                        label="To Currency"
                                        error={!toCurrency}
                                        showValidation={showValidation}
                                        prices={prices}
                                    />

                                    <AmountInput
                                        value={receiveAmount}
                                        onChange={() => {}}
                                        label="Amount to Receive"
                                        currency={toCurrency}
                                        readOnly={true}
                                    />

                                    {getExchangeRate() && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <ExchangeRate
                                                    fromCurrency={fromCurrency}
                                                    toCurrency={toCurrency}
                                                    getExchangeRate={
                                                        getExchangeRate
                                                    }
                                                    formatCurrencyAmount={
                                                        formatCurrencyAmount
                                                    }
                                                />
                                            </Box>
                                            <Tooltip title="Live exchange rate from market data">
                                                <InfoIcon
                                                    sx={{
                                                        fontSize: 16,
                                                        color: "text.secondary",
                                                    }}
                                                />
                                            </Tooltip>
                                        </Box>
                                    )}

                                    <SwapButton
                                        fromCurrency={fromCurrency}
                                        toCurrency={toCurrency}
                                        amount={amount}
                                        isLoading={isLoading}
                                        handleSwap={handleSwapClick}
                                        validationError={validationError}
                                    />
                                </Box>
                            </Grow>
                        )}
                    </Box>
                </Card>
                <Footer />
            </Container>

            {/* Confirmation Dialog */}
            <ConfirmSwapDialog
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                amount={Number(amount)}
                receiveAmount={Number(receiveAmount)}
                confirmSwap={confirmSwap}
                exchangeRate={getExchangeRate() ?? undefined}
            />

            {/* Success Notification */}
            <SuccessNotification
                openNotification={openNotification}
                handleCloseNotification={handleCloseNotification}
                amount={amount}
                fromCurrency={fromCurrency}
                receiveAmount={receiveAmount}
                toCurrency={toCurrency}
                formatCurrencyAmount={formatCurrencyAmount}
            />
        </Box>
    );
};

export default CurrencySwap;
