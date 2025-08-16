import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Заполните поле почты корректно"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    goals: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: [],
    },
    dailyMinutes: {
      type: Number,
      default: 15,
      min: 5,
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const User = model("User", userSchema);
