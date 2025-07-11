import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                textAlign: "center",
                mt: 3,
                mb: 2,
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                }}
            >
                Real-time exchange rates • Secure transactions
            </Typography>
        </Box>
    );
};

export default Footer;
