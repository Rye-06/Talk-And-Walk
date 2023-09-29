import mongoose, { Schema } from "mongoose";

const registerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minLength: [1, "Name must be larger than 1 character"],
    maxLength: [50, "Name must be lesser than 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },

  password: {
    type: String,
    required: [true, "Password is required."],
  },

  age: {
    type: Number,
    required: [true, "Age is required."],
  },

  interests: {
    'type': {type: String},
  },
  lat: {
    'type': String
  },
  long: {
    'type': String
  },
});

const Register =
  mongoose.models.Register || mongoose.model("Register", registerSchema);

export default Register;