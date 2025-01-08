import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: (v) => /^\d{10}$/.test(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    city: {
      type: String,
      maxlength: [100, "City name cannot exceed 100 characters"],
    },
    state: {
      type: String,
      maxlength: [100, "State name cannot exceed 100 characters"],
    },
    country: {
      type: String,
      maxlength: [100, "Country name cannot exceed 100 characters"],
    },
    position: {
      type: String,
      maxlength: [100, "Position cannot exceed 100 characters"],
    },
    role: {
      type: String,
      enum: ["Employee", "Admin","Client"],
      default: "Admin",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
