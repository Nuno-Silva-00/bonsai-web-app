import {
  CREATE,
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_BONSAI,
  FETCH_BY_EMAIL,
  LIKE,
  FETCH_BY_SEARCH,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";
import * as api from "../api";

export const createBonsai = (bonsai, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createBonsai(bonsai);
    navigate(`/bonsais/${data.newBonsai._id}`);

    dispatch({ type: CREATE, payload: data.newBonsai });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getBonsais = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchBonsais(page);
    dispatch({ type: FETCH_ALL, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getBonsaiId = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchBonsaiId(id);
    dispatch({ type: FETCH_BONSAI, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getBonsaiByEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const loggedInUser = JSON.parse(localStorage.getItem("profile"))?.result
      .email;

    const { data } = await api.fetchBonsaiByEmail(email, loggedInUser);
    dispatch({ type: FETCH_BY_EMAIL, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getBonsaiBySearch = (search) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchBonsaiBySearch(search);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const likeBonsai = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const userEmail = user?.result?.email;

  try {
    const { data } = await api.likeBonsai(id, userEmail);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateBonsai = (bonsai, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.updateBonsai(bonsai);

    navigate(`/bonsais/${data.updatedBonsai._id}`);
    dispatch({ type: UPDATE, payload: data.updatedBonsai });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBonsai = (id) => async (dispatch) => {
  try {
    await api.deleteBonsai(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
