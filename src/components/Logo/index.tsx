import { Box } from "@mui/material";

export default function Logo() {
  return (
    <Box sx={{ width: 160, height: "100%" }}>
      <img src="/images/logo.png" alt="logo snap avif" style={{ height: "100%", width: "100%", verticalAlign: "middle" }} />
    </Box>
  );
}
