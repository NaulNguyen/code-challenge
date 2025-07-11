import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { styles } from "./styles";

const Header = () => {
    return (
        <Box sx={styles.header}>
            <Box sx={styles.iconWrapper}>
                <TrendingUpIcon
                    sx={{
                        fontSize: 32,
                        color: "white",
                    }}
                />
            </Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                Currency Swap
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Exchange currencies with real-time rates
            </Typography>
        </Box>
    );
};

export default Header;
