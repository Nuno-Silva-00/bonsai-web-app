import React from "react";
import { Typography, Avatar, Box, AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { getBonsaiByEmail } from "../../actions/bonsais";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ProfileBar = ({ name, picture, email, numberOfBonsais, totalLikes }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleProfile = () => {
    dispatch(getBonsaiByEmail(email));
    navigate(`/user/${email}`);
  };

  return (
    <Box className={classes.Box}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} display="flex">
            <Avatar
              src={picture}
              alt={name}
              onClick={handleProfile}
              className={classes.avatar}
              {...stringAvatar(name)}
            >
              {name.charAt(0)}
            </Avatar>
            <Typography
              variant="h6"
              onClick={handleProfile}
              sx={{ marginRight: 10, marginTop: "4px" }}
            >
              {name}
            </Typography>
          </Box>

          <Typography sx={{ marginRight: 10 }}>
            <strong>Number of Bonsais:</strong> {numberOfBonsais}
          </Typography>

          <Typography>
            <strong>Total Likes:</strong> {totalLikes}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ProfileBar;
