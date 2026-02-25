import { Box, Typography, Chip, Stack } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";

const Footer = () => {
    return (
        <Box
            sx={{
                textAlign: "center",
                mt: 4,
                mb: 2,
            }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <Chip
                    icon={<SpeedIcon sx={{ fontSize: 16 }} />}
                    label="Real-time rates"
                    size="small"
                    sx={{
                        background: "rgba(76, 175, 80, 0.1)",
                        color: "success.main",
                        borderColor: "success.main",
                        fontWeight: 600,
                    }}
                    variant="outlined"
                />
                <Chip
                    icon={<SecurityIcon sx={{ fontSize: 16 }} />}
                    label="Secure transactions"
                    size="small"
                    sx={{
                        background: "rgba(33, 150, 243, 0.1)",
                        color: "info.main",
                        borderColor: "info.main",
                        fontWeight: 600,
                    }}
                    variant="outlined"
                />
            </Stack>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    opacity: 0.7,
                    fontWeight: 500,
                }}
            >
                Powered by Switcheo Token Prices API
            </Typography>
        </Box>
    );
};

export default Footer;
