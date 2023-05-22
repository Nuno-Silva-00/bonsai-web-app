import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, CircularProgress } from "@mui/material";

import Bonsai from "../Bonsais/Bonsai/Bonsai";
import { getBonsaiByEmail } from "../../actions/bonsais";
import ProfileBar from "../ProfileBar/ProfileBar";

const Profile = () => {
  const dispatch = useDispatch();
  const { email } = useParams();

  const { userProfile, isLoading, numberOfBonsais, totalLikes } = useSelector(
    (state) => state.bonsais
  );

  const [totalLikesState, setTotalLikesState] = useState(totalLikes);

  useEffect(() => {
    dispatch(getBonsaiByEmail(email));
    setTotalLikesState(totalLikes);
  }, [dispatch, email, totalLikes]);

  if (!userProfile?.allBonsais.length && !isLoading) return "No Bonsais";
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <ProfileBar
        name={userProfile?.name}
        picture={userProfile?.email}
        email={userProfile?.email}
        numberOfBonsais={numberOfBonsais}
        totalLikes={totalLikesState}
      />
      <Grid container alignItems="stretch" spacing={3}>
        {userProfile?.allBonsais.map((bonsai) => (
          <Grid
            id={bonsai._id}
            key={bonsai._id}
            item
            xs={12}
            sm={12}
            md={6}
            lg={3}
          >
            <Bonsai
              bonsai={bonsai}
              setTotalLikesState={setTotalLikesState}
              totalLikesState={totalLikesState}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Profile;
