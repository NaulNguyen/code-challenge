import { useState, useEffect, useCallback } from "react";
import { Box, Container, Card, Alert, IconButton } from "@mui/material";
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

    useEffect(() => {
        const fetchPrices = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    "https://interview.switcheo.com/prices.json"
                );
                setPrices(
                    response.data.filter((price: Price) => price.price > 0)
                );
            } catch (err) {
                setError("Failed to fetch prices. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPrices();
    }, []);

    const validateAmount = (value: string): boolean => {
        if (!value) {
            setValidationError("Amount is required");
            return false;
        }
        if (Number(value) <= 0) {
            setValidationError("Amount must be greater than 0");
            return false;
        }
        setValidationError("");
        return true;
    };

    const getExchangeRate = () => {
        if (!fromCurrency || !toCurrency) return null;

        const fromPrice =
            prices.find((p) => p.currency === fromCurrency)?.price || 0;
        const toPrice =
            prices.find((p) => p.currency === toCurrency)?.price || 0;

        if (fromPrice && toPrice) {
            return fromPrice / toPrice;
        }
        return null;
    };

    const getPriceForCurrency = useCallback(
        (currency: string) => {
            return prices.find((p) => p.currency === currency)?.price || 0;
        },
        [prices]
    );

    const handleAmountChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/[^0-9.]/g, "");
            if (!isNaN(Number(value))) {
                setAmount(value);
            }
        },
        []
    );

    const handleSwapPositions = useCallback(() => {
        if (!fromCurrency || !toCurrency) return;

        setShowValidation(true);
        if (!validateAmount(amount)) return;

        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }, [fromCurrency, toCurrency, amount, validateAmount]);

    const handleSwap = useCallback(() => {
        setShowValidation(true);
        if (!validateAmount(amount)) return;

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setOpenNotification(true);
        }, 1500);
    }, [amount, validateAmount]);

    const handleCloseNotification = useCallback(() => {
        setOpenNotification(false);
    }, []);

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

    return (
        <Box sx={styles.root}>
            <Container maxWidth="sm">
                <Header />
                <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
                    <StatusBar />
                    <Box sx={{ p: 3 }}>
                        {error && (
                            <Alert severity="error" sx={styles.alertError}>
                                {error}
                            </Alert>
                        )}

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
                                <IconButton
                                    onClick={handleSwapPositions}
                                    disabled={!fromCurrency || !toCurrency}
                                    sx={{
                                        p: 2,
                                        bgcolor: "white",
                                        border: "2px solid",
                                        borderColor: "grey.300",
                                        borderRadius: "50%",
                                        transition: "all 0.2s ease",
                                        "&:hover:not(:disabled)": {
                                            borderColor: "primary.main",
                                            bgcolor: "primary.50",
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
                                                !fromCurrency || !toCurrency
                                                    ? "grey.400"
                                                    : "grey.600",
                                            width: "20px",
                                            height: "20px",
                                        }}
                                    />
                                </IconButton>
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
                                <ExchangeRate
                                    fromCurrency={fromCurrency}
                                    toCurrency={toCurrency}
                                    getExchangeRate={getExchangeRate}
                                    formatCurrencyAmount={formatCurrencyAmount}
                                />
                            )}

                            <SwapButton
                                fromCurrency={fromCurrency}
                                toCurrency={toCurrency}
                                amount={amount}
                                isLoading={isLoading}
                                handleSwap={handleSwap}
                            />
                        </Box>
                    </Box>
                </Card>
                <Footer />
            </Container>

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
