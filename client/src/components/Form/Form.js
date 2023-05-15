import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createBonsai, updateBonsai } from "../../actions/bonsais";
import {
  TextField,
  Button,
  Paper,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Grid,
  Stack,
} from "@mui/material";

const Form = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentId = useParams();

  const [bonsaiData, setBonsaiData] = useState({
    specie: "",
    nickname: "",
    age: "",
    description: "",
    photo: [],
    hide: "",
  });

  /// edit Bonsai /////
  const { bonsai } = useSelector((state) => (currentId ? state.bonsais : null));

  useEffect(() => {
    if (bonsai) setBonsaiData(bonsai);
  }, [bonsai]);

  const clear = () => {
    setBonsaiData({
      specie: "",
      nickname: "",
      age: "",
      description: "",
      photo: [],
      hide: "",
    });
  };

  const handleChange = (e) => {
    setBonsaiData({ ...bonsaiData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /// edit Bonsai ////
    if (bonsai) {
      dispatch(
        updateBonsai({ ...bonsaiData, name: user?.result?.email }, navigate)
      );
    } else {
      dispatch(
        createBonsai({ ...bonsaiData, email: user?.result?.email }, navigate)
      );
    }

    navigate("/");
    clear();
  };

  const handleImages = async (e) => {
    const tempArray = [];

    for (const photo of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      const base64 = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
      tempArray.push(base64);
    }

    setBonsaiData({
      ...bonsaiData,
      photo: tempArray,
    });
  };

  return (
    <Paper elevation={6} sx={{ paddingBottom: 10, borderRadius: "15px" }}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              name="specie"
              variant="outlined"
              label="Specie"
              required
              value={bonsaiData.specie}
              onChange={handleChange}
              sx={{ marginTop: "40px" }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="nickname"
              variant="outlined"
              label="Nickname"
              value={bonsaiData.nickname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              name="age"
              type="number"
              label="Age"
              value={bonsaiData.age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              name="description"
              variant="outlined"
              label="Description"
              multiline
              rows={4}
              value={bonsaiData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <FormControl required sx={{ minWidth: 200 }}>
              <InputLabel id="id-label">Hide</InputLabel>
              <Select
                labelId="id-label"
                id="id"
                value={bonsaiData.hide}
                onChange={(e) =>
                  setBonsaiData({ ...bonsaiData, hide: e.target.value })
                }
                label="Hide *"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple={true}
                type="file"
                required
                onChange={handleImages}
              />
            </Button>
          </Grid>

          <Grid item>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="warning" onClick={clear}>
                Clear
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={handleSubmit}
                disabled={bonsaiData.photo.length > 0 ? false : true}
              >
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Form;
