import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request: Request, { params }: any) => {
  const { id } = params;

  try {
    await connect();

    const post = await Post.findById(id);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request: Request, { params }: any) => {
  const { id } = params;
  const body = await request.json();

  try {
    await connect();

    if (body?.type === "comment") {
      const post = await Post.findByIdAndUpdate(id, {
        $push: {
          comments: {
            comment: body.comment,
            name: body.name,
            email: body.email,
            avatarUrl: body?.avatarUrl || "",
          },
        },
      });
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } else {
      const post = await Post.findByIdAndUpdate(id, body);
      return new NextResponse(JSON.stringify(post), { status: 200 });
    }
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: any) => {
  const { id } = params;

  try {
    await connect();

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
