import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
  name: String,
  birthdate: Date,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

const Actor = mongoose.model("Actor", actorSchema);

export default Actor;
