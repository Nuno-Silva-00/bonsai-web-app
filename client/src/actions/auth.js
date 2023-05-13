import * as api from "../api";

export const createLoginUser = (user) => async (dispatch) => {
  try {
    await api.createBonsai(user);
  } catch (error) {
    console.log(error);
  }
};
