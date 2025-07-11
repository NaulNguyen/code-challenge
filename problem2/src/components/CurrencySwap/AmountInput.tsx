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
                            width: 20,
                            height: 20,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                        alt={currency}
                    />
                </InputAdornment>
            ),
            endAdornment: currency && (
                <InputAdornment position="end">
                    <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{ fontWeight: 500 }}
                    >
                        {currency}
                    </Typography>
                </InputAdornment>
            ),
        }}
        sx={{
            "& .MuiInputBase-root": {
                borderRadius: 1,
                transition: "all 0.2s ease-in-out",
                ...(readOnly && {
                    backgroundColor: "grey.50",
                    "&:hover": {
                        backgroundColor: "grey.100",
                    },
                    "& .MuiInputBase-input": {
                        cursor: "default",
                        WebkitTextFillColor: "text.primary",
                        color: "text.primary",
                        opacity: 0.8,
                        "&::selection": {
                            backgroundColor: "transparent",
                        },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "grey.300",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "grey.400",
                    },
                }),
                ...(!readOnly && {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: 2,
                    },
                }),
            },
            "& .MuiFormLabel-root": {
                ...(readOnly && {
                    color: "text.secondary",
                    "&.Mui-focused": {
                        color: "text.secondary",
                    },
                }),
            },
            "& .MuiInputAdornment-root": {
                "& .MuiTypography-root": {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                },
            },
        }}
    />
);
