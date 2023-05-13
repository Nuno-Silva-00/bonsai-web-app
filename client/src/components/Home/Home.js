import { Container } from "@mui/system";
import React from "react";

import Bonsais from "../Bonsais/Bonsais.js";
import SearchBar from "../SearchBar/SearchBar.js";
import "./styles.css";

const Home = () => {
  return (
    <Container maxWidth="xl">
      <SearchBar />
      <Bonsais />
    </Container>
  );
};

export default Home;
