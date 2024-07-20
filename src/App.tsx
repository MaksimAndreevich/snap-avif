import { Box } from "@mui/material";
import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header />
      <Main />
      {/* <Footer /> */}
    </Box>
  );
};

export default App;
