import { model, Schema } from "mongoose";

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["words", "listening", "grammar"],
    },
    difficulty: {
      type: String,
      required: true,
      trim: true,
      enum: ["easy", "medium", "hard"],
    },
    requiredLevel: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      default: "/",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Game = model("Game", gameSchema);
