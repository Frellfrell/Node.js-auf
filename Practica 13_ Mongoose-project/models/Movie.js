import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  releaseYear: Number,
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
});
