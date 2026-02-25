import { Box, Typography, Chip } from "@mui/material";
import { styles } from "./styles";
import WalletIcon from "@mui/icons-material/Wallet";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState, useEffect } from "react";

const StatusBar = () => {
    const [timestamp, setTimestamp] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimestamp(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
                        gap: 1.5,
                        color: "white",
                    }}
                >
                    <WalletIcon
                        sx={{
                            fontSize: 24,
                            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        Quick Swap
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    <Chip
                        icon={
                            <AccessTimeIcon
                                sx={{ fontSize: 16, color: "white !important" }}
                            />
                        }
                        label={`Updated ${timestamp.toLocaleTimeString()}`}
                        size="small"
                        sx={{
                            background: "rgba(255, 255, 255, 0.2)",
                            color: "white",
                            fontWeight: 600,
                            backdropFilter: "blur(10px)",
                            "& .MuiChip-icon": {
                                color: "white",
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default StatusBar;
