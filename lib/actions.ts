import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

const isProduction = process.env.NODE_ENV === "production";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_MONGO || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const getBlog = async (request: Request) => {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");

  try {
    await connect();

    const posts = await Post.find({username});

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const createNewBlog = async (request: Request) => {
  const body = await request.json();

  const newPost = new Post(body);

  try {
    await connect();

    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const fetchAllBlogs = async () => {
  const res = await fetch("https://64b7ffa321b9aa6eb0796a57.mockapi.io/blog");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
