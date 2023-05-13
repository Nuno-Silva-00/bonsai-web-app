import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { likeBonsai } from "../../../actions/bonsais.js";

import like from "../../../img/like.png";
import useStyles from "./styles";

const Bonsai = ({ bonsai, setTotalLikesState, totalLikesState }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openPost = () => navigate(`/bonsais/${bonsai._id}`);

  const user = JSON.parse(localStorage.getItem("profile"));
  const userEmail = user?.result?.email;

  const [likes, setLikes] = useState(bonsai.likes);

  const hasLikedBonsai = likes.find((like) => like === userEmail);

  useEffect(() => {
    setLikes(bonsai.likes);
  }, [bonsai.likes]);

  const handleLike = async () => {
    dispatch(likeBonsai(bonsai._id));

    if (hasLikedBonsai) {
      setLikes((prevLikes) => prevLikes.filter((email) => email !== userEmail));
      if (totalLikesState) setTotalLikesState(totalLikesState - 1);
    } else {
      setLikes((prevLikes) => [...prevLikes, userEmail]);
      if (totalLikesState) setTotalLikesState(totalLikesState + 1);
    }
  };

  return (
    <Card
      className={classes.card}
      raised
      elevation={6}
      sx={{ borderRadius: "15px" }}
    >
      <CardMedia
        className={classes.cardMedia}
        alt={bonsai.specie}
        image={bonsai.photo[bonsai.photo.length - 1]}
        title={bonsai.specie}
        component="div"
      />

      <CardContent className={classes.cardContent}>
        <Typography variant="h5" gutterBottom>
          {bonsai.specie.charAt(0).toUpperCase() + bonsai.specie.slice(1)}
        </Typography>
        <Typography>
          {bonsai.age !== 1 ? bonsai.age + " years" : "1 year"}
        </Typography>
      </CardContent>

      <CardActions>
        <Tooltip
          title={!user ? "Login to Like" : null}
          placement="bottom-start"
        >
          <span>
            <Button
              size="small"
              onClick={handleLike}
              disabled={!user ? true : false}
            >
              {likes.length}
              <img
                className={classes.likeButton}
                alt="like button"
                src={like}
              />
            </Button>
          </span>
        </Tooltip>
        <Button size="small" onClick={openPost}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default Bonsai;
