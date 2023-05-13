import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  Paper: {
    padding: "10px",
    marginBottom: "20px",
  },
  appBar: {
    marginBottom: "20px",
  },
  button: {
    flexGrow: 1,
    display: { xs: "none", sm: "block" },
  },
  toolbar: {
    marginBottom: "20px",
    borderRadius: "15px",
    backgroundColor: "#F8EDE3",
    textTransform: "capitalize",
  },

  container: {
    display: "flex",
    overflowX: "scroll",
    width: "100%",
  },

  img: {
    flexShrink: "0",
    width: "auto",
    height: "500px",
    borderRadius: "15px",
    marginRight: "17px",
    marginBottom: "10px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  },
}));
