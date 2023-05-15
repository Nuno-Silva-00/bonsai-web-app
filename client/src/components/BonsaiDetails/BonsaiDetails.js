import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  Toolbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import { getBonsaiId, deleteBonsai } from "../../actions/bonsais";
import ProfileBar from "../ProfileBar/ProfileBar";
import useStyles from "./styles";

const BonsaiDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const userLoggedIn = JSON.parse(localStorage.getItem("profile"))?.result
    .email;

  const { bonsai, isLoading, numberOfBonsais, totalLikes } = useSelector(
    (state) => state.bonsais
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBonsaiId(id));
  }, [dispatch, id]);

  if (!bonsai) return null;

  if (isLoading) {
    return (
      <Paper elevation={6}>
        <CircularProgress size="10em" />
      </Paper>
    );
  }

  const editBonsai = () => {
    navigate(`/createBonsai/${id}`);
  };

  const removeBonsai = () => {
    dispatch(deleteBonsai(bonsai._id));
    navigate("/");
  };

  //show latest photo first
  bonsai?.photo.reverse();

  return (
    <>
      <ProfileBar
        name={bonsai.creator.name}
        picture={bonsai.creator.avatar}
        email={bonsai.creator.email}
        numberOfBonsais={numberOfBonsais}
        totalLikes={totalLikes}
      />
      <Paper
        className={classes.Paper}
        elevation={6}
        sx={{ borderRadius: "15px" }}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h3">{bonsai.specie}</Typography>
          {userLoggedIn === bonsai.creator.email ? (
            <Box className={classes.button} display="flex">
              <Box sx={{ marginLeft: "auto" }}>
                <Button
                  color="secondary"
                  variant="elevated"
                  nowrap="true"
                  component="div"
                  onClick={editBonsai}
                >
                  <EditIcon />
                </Button>
                <Button
                  color="error"
                  variant="elevated"
                  nowrap="true"
                  component="div"
                  onClick={removeBonsai}
                >
                  <DeleteOutlineIcon />
                </Button>
              </Box>
            </Box>
          ) : null}
        </Toolbar>

        <div className={classes.container}>
          {bonsai.photo.map((image, index) => (
            <img
              key={index}
              id={index}
              src={image}
              alt={bonsai.specie}
              className={classes.img}
            />
          ))}
        </div>
      </Paper>

      <Paper
        className={classes.Paper}
        elevation={6}
        sx={{ borderRadius: "15px" }}
      >
        <Typography gutterBottom>
          <strong>AGE:</strong> {bonsai.age}
        </Typography>

        <Typography gutterBottom>
          <strong>NICKNAME:</strong> {bonsai.nickname}
        </Typography>

        <Typography gutterBottom>
          <strong>Likes:</strong> {bonsai.likes.length}
        </Typography>

        <Typography gutterBottom>
          <strong>DESCRIPTION:</strong> {bonsai.description}
        </Typography>
      </Paper>
    </>
  );
};

export default BonsaiDetails;
