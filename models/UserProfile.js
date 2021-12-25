import { Schema } from "mongoose";

const UserProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  MinecraftUUID: {
    type: String,
    required: true,
  },
});
