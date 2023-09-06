import mongoose from "mongoose";

const influencerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  socialMedia: { type: String, required: true },
  followers: { type: Number, required: true },
});

const inFluencerModel = mongoose.model("list", influencerSchema);

export default inFluencerModel;
