import { Box, styled } from "@mui/material";

const StyledDropAreaBox = styled(Box)(({ theme }) => ({
  border: "2px dashed #ccc",
  borderRadius: "10px",
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#333",
  flexGrow: 1,
  "&.highlight": {
    borderColor: "#e8772e",
  },
}));

const StyledInput = styled("input")({
  display: "none",
});

export { StyledDropAreaBox, StyledInput };
