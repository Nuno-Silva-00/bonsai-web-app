import mongoose from "mongoose";

const connection = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("Mongo Connected"))
    .catch((error) => console.log(error));
};

export default connection;
