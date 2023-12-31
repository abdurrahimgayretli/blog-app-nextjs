import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: { type: Array, default: [] },
    createdBy: {
      name: { type: String },
      email: { type: String },
      avatarUrl: { type: String },
    },
  },
  { timestamps: true }
);
const Post = mongoose?.models?.Post || mongoose.model("Post", postSchema);
export default Post;
