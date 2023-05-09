import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: true },
  allBonsais: [{ type: mongoose.Schema.Types.ObjectID, ref: "Bonsai" }],
});

const USER = mongoose.model("User", UserSchema);

export default USER;
