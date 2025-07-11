import { Box, Typography } from "@mui/material";
import { styles } from "./styles";
import WalletIcon from "@mui/icons-material/Wallet";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StatusBar = () => {
    return (
        <Box sx={styles.statusBar}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "white",
                    }}
                >
                    <WalletIcon />
                    <Typography variant="subtitle1">Quick Swap</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "rgba(255,255,255,0.8)",
                    }}
                >
                    <AccessTimeIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2">Live rates</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default StatusBar;
