import { model, Schema } from "mongoose";

const gameProgressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    bestScore: {
      type: Number,
      default: 0,
      min: 0,
    },
    isLocked: {
      type: Boolean,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      { user: 1, gameId: 1 }, // пара пользователь + игра
    ],
  }
);

export const GameProgress = model("GameProgress", gameProgressSchema);
