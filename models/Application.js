import { Schema } from "mongoose";

const ApplicationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});
