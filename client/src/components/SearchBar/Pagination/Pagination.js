import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBonsais } from "../../../actions/bonsais";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.bonsais);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getBonsais(page));
  }, [dispatch, page]);

  return (
    <Pagination
      sx={{ flexGrow: 1 }}
      count={numberOfPages}
      page={Number(page) || 1}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/bonsais?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
