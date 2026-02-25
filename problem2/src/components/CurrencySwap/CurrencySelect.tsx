import {
    TextField,
    MenuItem,
    Box,
    Typography,
    Avatar,
    Chip,
} from "@mui/material";
import type { Price } from "../../types/price";
import { getCurrencyIcon } from "../../utils/getCurrencyIcon";
import { formatCurrencyAmount } from "../../utils/formatCurrencyAmount";

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
                        maxHeight: 400,
                        background: "rgba(255, 255, 255, 0.98)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        borderRadius: 3,
                        "& .MuiMenuItem-root": {
                            py: 1.5,
                            px: 2,
                            borderRadius: 2,
                            mx: 1,
                            my: 0.5,
                            "&:hover": {
                                bgcolor: "rgba(102, 126, 234, 0.08)",
                                transform: "translateX(4px)",
                                transition: "all 0.2s ease",
                            },
                        },
                    },
                },
            },
        }}
        sx={{
            "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderWidth: 2,
                    borderColor: "primary.main",
                },
            },
            "& .MuiInputLabel-root": {
                fontWeight: 500,
                "&.Mui-focused": {
                    color: "primary.main",
                },
            },
        }}
    >
        <MenuItem value="" sx={{ color: "text.secondary" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                    sx={{
                        width: 28,
                        height: 28,
                        bgcolor: "grey.200",
                    }}
                >
                    ?
                </Avatar>
                <Typography sx={{ fontWeight: 500 }}>
                    Select currency...
                </Typography>
            </Box>
        </MenuItem>
        {prices.map((price, index) => (
            <MenuItem
                key={`${price.currency}-${index}`}
                value={price.currency}
                sx={{
                    "&.Mui-selected": {
                        bgcolor: "rgba(102, 126, 234, 0.15)",
                        "&:hover": {
                            bgcolor: "rgba(102, 126, 234, 0.2)",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        width: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <Avatar
                            src={getCurrencyIcon(price.currency)}
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
                            alt={price.currency}
                        />
                        <Box>
                            <Typography
                                sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                            >
                                {price.currency}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "text.secondary",
                                    fontSize: "0.75rem",
                                }}
                            >
                                {new Date(price.date).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                    <Chip
                        label={`$${formatCurrencyAmount(
                            price.price.toString()
                        )}`}
                        size="small"
                        sx={{
                            background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            height: 24,
                            "& .MuiChip-label": {
                                px: 1.5,
                            },
                        }}
                    />
                </Box>
            </MenuItem>
        ))}
    </TextField>
);
