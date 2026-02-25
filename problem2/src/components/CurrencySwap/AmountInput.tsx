import { TextField, InputAdornment, Typography, Avatar } from "@mui/material";
import { formatCurrencyAmount } from "../../utils/formatCurrencyAmount";
import { getCurrencyIcon } from "../../utils/getCurrencyIcon";

interface AmountInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    currency: string;
    readOnly?: boolean;
    error?: string;
    showValidation?: boolean;
}

export const AmountInput = ({
    value,
    onChange,
    label,
    currency,
    readOnly = false,
    error,
    showValidation,
}: AmountInputProps) => (
    <TextField
        label={label}
        value={value ? formatCurrencyAmount(value) : ""}
        onChange={onChange}
        fullWidth
        error={showValidation && !!error}
        helperText={showValidation && error ? error : ""}
        InputProps={{
            readOnly,
            startAdornment: currency && (
                <InputAdornment position="start">
                    <Avatar
                        src={getCurrencyIcon(currency)}
                        sx={{
                            width: 28,
                            height: 28,
                            border: "2px solid",
                            borderColor: readOnly ? "grey.300" : "primary.main",
                            background: readOnly
                                ? "grey.100"
                                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            "& img": {
                                objectFit: "contain",
                            },
                        }}
                        alt={currency}
                    />
                </InputAdornment>
            ),
            endAdornment: currency && (
                <InputAdornment position="end">
                    <Typography
                        color={readOnly ? "text.secondary" : "primary.main"}
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            background: readOnly
                                ? "transparent"
                                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            backgroundClip: readOnly ? "unset" : "text",
                            WebkitBackgroundClip: readOnly ? "unset" : "text",
                            WebkitTextFillColor: readOnly
                                ? "inherit"
                                : "transparent",
                        }}
                    >
                        {currency}
                    </Typography>
                </InputAdornment>
            ),
        }}
        sx={{
            "& .MuiInputBase-root": {
                borderRadius: 3,
                background: readOnly
                    ? "rgba(245, 245, 245, 0.8)"
                    : "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease-in-out",
                fontSize: "1.1rem",
                ...(readOnly && {
                    "&:hover": {
                        backgroundColor: "rgba(240, 240, 240, 0.9)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                    "& .MuiInputBase-input": {
                        cursor: "default",
                        WebkitTextFillColor: "rgba(0, 0, 0, 0.8)",
                        color: "rgba(0, 0, 0, 0.8)",
                        fontWeight: 600,
                        "&::selection": {
                            backgroundColor: "transparent",
                        },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "grey.300",
                        borderWidth: 2,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "grey.400",
                    },
                }),
                ...(!readOnly && {
                    "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 6px 20px rgba(102, 126, 234, 0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                        borderWidth: 2,
                    },
                    "&.Mui-focused": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: 2,
                        borderColor: "primary.main",
                    },
                    "& .MuiInputBase-input": {
                        fontWeight: 600,
                        fontSize: "1.1rem",
                    },
                }),
            },
            "& .MuiFormLabel-root": {
                fontWeight: 600,
                ...(readOnly && {
                    color: "text.secondary",
                    "&.Mui-focused": {
                        color: "text.secondary",
                    },
                }),
                ...(!readOnly && {
                    "&.Mui-focused": {
                        color: "primary.main",
                        fontWeight: 700,
                    },
                }),
            },
            "& .MuiInputAdornment-root": {
                "& .MuiTypography-root": {
                    fontSize: "0.9rem",
                    fontWeight: 600,
                },
            },
        }}
    />
);
