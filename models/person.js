import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  FD: Array,
});

const person = mongoose.model("person", PersonSchema);
export default person;
