import { Box, Typography, Grow, Fade } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { styles } from "./styles";
import { useEffect, useState } from "react";

const Header = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Box sx={styles.header}>
            <Grow in={mounted} timeout={800}>
                <Box sx={styles.iconWrapper}>
                    <TrendingUpIcon
                        sx={{
                            fontSize: 40,
                            color: "white",
                            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                            animation: "float 3s ease-in-out infinite",
                            "@keyframes float": {
                                "0%, 100%": { transform: "translateY(0px)" },
                                "50%": { transform: "translateY(-8px)" },
                            },
                        }}
                    />
                </Box>
            </Grow>
            <Fade in={mounted} timeout={1000}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontWeight: 800,
                        background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textAlign: "center",
                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        marginBottom: 1,
                    }}
                >
                    Currency Swap
                </Typography>
            </Fade>
            <Fade in={mounted} timeout={1200}>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        opacity: 0.8,
                        letterSpacing: "0.5px",
                    }}
                >
                    Exchange currencies with real-time market rates
                </Typography>
            </Fade>
        </Box>
    );
};

export default Header;
