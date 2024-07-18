import { Box, styled } from "@mui/material";

const ScrollContainer = styled(Box)(({ theme }) => ({
  maxHeight: 240,
  overflowX: "auto",
  display: "flex",
  marginTop: 8,
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  minWidth: 200,
  marginRight: theme.spacing(1),
}));

const Image = styled("img")({
  width: "100%",
  height: "100%",
});

export { Image, ImageContainer, ScrollContainer };
