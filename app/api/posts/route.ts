import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  
  const email = url.searchParams.get("email");

  try {
    await connect();

    const posts = await Post.find({ email })

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  const url = new URL(request.url);
  const body = await request.json();

  const pagination = parseInt(body.padination);
  const pageNumber = parseInt(body.page);

  const email = url.searchParams.get("email");

  try {
    await connect();

    const posts = await Post.find({ email })
      .skip((pageNumber - 1) * pagination)
      .limit(pagination);

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request: Request) => {
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
