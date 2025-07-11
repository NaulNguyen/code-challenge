import { TextField, MenuItem, Box, Typography, Avatar } from "@mui/material";
import type { Price } from "../../types/price";
import { getCurrencyIcon } from "../../utils/getCurrencyIcon";

interface CurrencySelectProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    label: string;
    error?: boolean;
    showValidation?: boolean;
    prices: Price[];
}

export const CurrencySelect = ({
    id,
    value,
    onChange,
    label,
    error,
    showValidation,
    prices,
}: CurrencySelectProps) => (
    <TextField
        id={id}
        select
        label={label}
        inputProps={{ id }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        error={showValidation && !!error}
        helperText={showValidation && error ? error : ""}
        SelectProps={{
            MenuProps: {
                PaperProps: {
                    sx: {
                        maxHeight: 300,
                        "& .MuiMenuItem-root": {
                            py: 1,
                            "&:hover": {
                                bgcolor: "action.hover",
                            },
                        },
                    },
                },
            },
        }}
        sx={{
            "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderWidth: 2,
                },
            },
        }}
    >
        <MenuItem value="" sx={{ color: "text.secondary" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Select currency...
            </Box>
        </MenuItem>
        {prices.map((price, index) => (
            <MenuItem
                key={`${price.currency}-${index}`} // Add index to make key unique
                value={price.currency}
                sx={{
                    "&.Mui-selected": {
                        bgcolor: "primary.lighter",
                        "&:hover": {
                            bgcolor: "primary.light",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        width: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Avatar
                            src={getCurrencyIcon(price.currency)}
                            sx={{
                                width: 24,
                                height: 24,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                            alt={price.currency}
                        />
                        <Typography>{price.currency}</Typography>
                    </Box>
                </Box>
            </MenuItem>
        ))}
    </TextField>
);
