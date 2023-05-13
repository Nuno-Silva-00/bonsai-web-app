import React from "react";
import { Container } from "@mui/system";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/NavBar/NavBar.js";
import Home from "./components/Home/Home.js";
import Form from "./components/Form/Form.js";
import BonsaiDetails from "./components/BonsaiDetails/BonsaiDetails.js";

import Profile from "./components/Profile/Profile.js";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GoogleClientId}>
      <BrowserRouter>
        <Container
          maxWidth="xl"
          sx={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
        >
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={<Navigate to="/bonsais" replace />}
            />
            <Route path="/bonsais" exact element={<Home />} />
            <Route path="/createBonsai/:id" exact element={<Form />} />
            <Route path="/createBonsai" exact element={<Form />} />
            <Route path="/bonsais/search/query" exact element={<Home />} />
            <Route path="/bonsais/:id" exact element={<BonsaiDetails />} />
            <Route path="/user/:email" exact element={<Profile />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
