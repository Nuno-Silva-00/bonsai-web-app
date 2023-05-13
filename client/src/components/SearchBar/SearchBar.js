import React, { useState } from "react";
import { Box, AppBar, Toolbar, Button, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles.js";
import useStyles from "./styles";

import { getBonsaiBySearch } from "../../actions/bonsais.js";
import Paginate from "./Pagination/Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchBar = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const addBonsai = () => navigate("/createBonsai");

  const [search, setSearch] = useState("");

  const query = useQuery();
  const page = query.get("page") || 1;

  const searchBonsai = () => {
    if (search.trim()) {
      dispatch(getBonsaiBySearch(search));
      navigate(`/bonsais/search/query?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchBonsai();
    }
  };

  return (
    <Box className={classes.Box}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              name="search"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyDown={handleKeyPress}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>
          <Button
            sx={{ marginRight: 5 }}
            onClick={searchBonsai}
            variant="container"
          >
            Search
          </Button>

          <Paginate page={page} />

          <Tooltip
            title={!user ? "Login to Create Bonsai" : null}
            placement="bottom-start"
          >
            <span>
              <Button
                color="secondary"
                variant="elevated"
                nowrap="true"
                component="div"
                disabled={!user ? true : false}
                className={classes.button}
                onClick={addBonsai}
              >
                Create Bonsai
              </Button>
            </span>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
