import mongoose from "mongoose";

const bonsaiSchema = new mongoose.Schema({
  specie: { type: String, required: true },
  nickname: { type: String },
  age: { type: Number },
  description: { type: String },
  photo: [{ type: String, required: true }],
  likes: { type: [String], default: [] },
  hide: { type: Boolean, required: true },
  createdAt: { type: Date, default: new Date() },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const BONSAI = mongoose.model("Bonsai", bonsaiSchema);

export default BONSAI;
