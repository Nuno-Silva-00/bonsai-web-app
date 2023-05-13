import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  START_LOADING,
  END_LOADING,
  FETCH_BONSAI,
  FETCH_BY_EMAIL,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { bonsais: [], isLoading: true }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        bonsais: action.payload.bonsais,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        bonsai: "",
      };
    case FETCH_BONSAI:
      return {
        ...state,
        bonsai: action.payload.bonsaiExists,
        numberOfBonsais: action.payload.numberOfBonsais,
        totalLikes: action.payload.totalLikes,
      };
    case FETCH_BY_EMAIL:
      return {
        ...state,
        userProfile: action.payload.data,
        numberOfBonsais: action.payload.numberOfBonsais,
        totalLikes: action.payload.totalLikes,
        bonsai: "",
      };
    case FETCH_BY_SEARCH:
      return { ...state, bonsais: action.payload.data };
    case CREATE:
      return { ...state, bonsais: [...state.bonsais, action.payload] };
    case UPDATE:
      return {
        ...state,
        bonsais: state.bonsais.map((bonsai) =>
          bonsai._id === action.payload._id ? action.payload : bonsai
        ),
      };
    case DELETE:
      return {
        ...state,
        bonsais: state.bonsais.filter(
          (bonsai) => bonsai._id !== action.payload
        ),
      };
    case LIKE:
      return {
        ...state,
        bonsais: state.bonsais.map((bonsai) =>
          bonsai._id === action.payload._id ? action.payload : bonsai
        ),
      };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
