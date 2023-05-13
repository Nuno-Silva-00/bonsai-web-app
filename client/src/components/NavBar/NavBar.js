import { React, useState, useEffect } from "react";

import {
  Typography,
  AppBar,
  Button,
  Avatar,
  Toolbar,
  Grid,
  Box,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

import { createLoginUser } from "../../api";
import { LOGOUT, AUTH, NAVIGATE } from "../../constants/actionTypes";

import bonsaiLogo from "../../img/logo.png";
import useStyles from "./styles";
import { getBonsaiByEmail } from "../../actions/bonsais";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      if (user.result.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line
  }, [location]);

  const googleSuccess = async (credentialResponse) => {
    let token = credentialResponse?.credential;
    let result = jwt_decode(token);

    try {
      dispatch({ type: AUTH, data: { result } });

      createLoginUser({
        email: result.email,
        picture: result.picture,
        name: result.name,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In Failed. Try Again Later");
  };

  const handleProfile = () => {
    dispatch(getBonsaiByEmail(user.result.email));
    navigate(`/user/${user.result.email}`);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Box>
      <AppBar
        position="static"
        color="inherit"
        className={classes.appBar}
        sx={{ marginTop: 5, marginBottom: 5 }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item flexGrow={1}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <img
                  src={bonsaiLogo}
                  alt="Bonsai Logo"
                  height="100px"
                  width="100px"
                />
              </Grid>
              <Grid item>
                <Typography variant="h1" onClick={handleNavigate}>
                  BONSAI SHARE
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Toolbar>
              {user ? (
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item>
                    <Avatar
                      src={user.result.picture}
                      alt={user.result.name}
                      onClick={handleProfile}
                    >
                      {user.result.name.charAt(0)}
                    </Avatar>
                  </Grid>

                  <Grid item>
                    <Typography variant="h6" onClick={handleProfile}>
                      {user.result.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <GoogleLogin
                  onSuccess={googleSuccess}
                  onError={googleFailure}
                  cookiePolicy="single_host_origin"
                />
              )}
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default NavBar;
