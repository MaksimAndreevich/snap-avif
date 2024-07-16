import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Link, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper sx={{ width: "100%", height: { xs: "auto", sm: 64 }, background: "", p: 1 }} elevation={8}>
      <Box display={"flex"} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
        <Box sx={{ display: "flex" }}>
          <GitHubIcon fontSize="small" />
          <Typography variant="body2" pl={0.5}>
            Open sources:
          </Typography>
        </Box>

        <Box sx={{ pl: 1 }}>
          <Link
            href="https://github.com/MaksimAndreevich/snap-avif-service"
            rel="noopener noreferrer"
            target="_blank"
            underline="hover"
            variant="body2"
            display={"block"}
          >
            Snap Avif Service
          </Link>
          <Link href="https://github.com/MaksimAndreevich/snap-avif" rel="noopener noreferrer" target="_blank" underline="hover" variant="body2">
            Snap Avif Frontend
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}
