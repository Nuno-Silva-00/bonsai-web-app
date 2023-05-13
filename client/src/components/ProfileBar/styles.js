import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  Box: {
    flexGrow: 1,
  },
  appBar: {
    borderRadius: "15px",
    marginBottom: "30px",
  },
  button: {
    flexGrow: 1,
    display: { xs: "none", sm: "block" },
  },
  likeButton: {
    height: "55px",
  },
  avatar: {
    marginRight: 20,
  },
}));
