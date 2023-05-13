import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

import Bonsai from "./Bonsai/Bonsai";

const Bonsais = () => {
  const { bonsais, isLoading } = useSelector((state) => state.bonsais);

  if (!bonsais?.length && isLoading) return "No Bonsais";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid sx={{ marginTop: "10px" }} container spacing={3}>
      {bonsais?.map((bonsai) => (
        <Grid
          item
          id={bonsai._id}
          key={bonsai._id}
          xs={12}
          sm={12}
          md={6}
          lg={3}
        >
          <Bonsai bonsai={bonsai} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Bonsais;
