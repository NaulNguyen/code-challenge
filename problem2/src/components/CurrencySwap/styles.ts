export const styles = {
    root: {
        minHeight: "100vh",
        background:
            "linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 50%, #EEF2FF 100%)",
        p: 4,
    },
    header: {
        textAlign: "center",
        mb: 4,
    },
    iconWrapper: {
        width: 64,
        height: 64,
        background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
        mx: "auto",
    },
    statusBar: {
        background: "linear-gradient(90deg, #2563EB 0%, #4F46E5 100%)",
        px: 3,
        py: 2,
    },
    alertSuccess: {
        borderRadius: 2,
        mb: 2,
        background: "rgba(46, 125, 50, 0.1)",
        border: "1px solid",
        borderColor: "success.main",
    },
    alertError: {
        borderRadius: 2,
        mb: 2,
        background: "rgba(211, 47, 47, 0.1)",
        border: "1px solid",
        borderColor: "error.main",
    },
    exchangeRate: {
        bgcolor: "rgba(37, 99, 235, 0.1)",
        borderRadius: 2,
        p: 2,
        mt: 2,
        border: "1px solid",
        borderColor: "primary.main",
    },
};