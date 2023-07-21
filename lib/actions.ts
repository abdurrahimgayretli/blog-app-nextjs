import { notFound } from "next/navigation";
import { SessionInterface } from "@/common.types";

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

export const uploadImage = async (
  imagePath: string,
  crop: any,
  size: { width: number; height: number }
) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        path: imagePath,
        crop,
        size,
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const fetchAllBlogs = async (currentPage: number) => {
  const queryParams = { page: 0, pagination: 4};
  queryParams["page"] = currentPage;

  const res = await fetch(`${serverUrl}/api/posts`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(queryParams),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getBlogByID = async (id: string) => {
  const res = await fetch(`${serverUrl}/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
};

export const deleteBlog = async (id: string, i: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      body: JSON.stringify(i),
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchPost = async (
  form: { title: string; content: string; img: string },
  session: SessionInterface
) => {
  try {
    const response = await fetch(`${serverUrl}/api/posts`, {
      method: "PUT",
      body: JSON.stringify({
        title: form.title,
        content: form.content,
        img: form.img,
        comments: [],
        createdBy: {
          name: session.user?.name,
          email: session.user?.email,
          avatarUrl: session.user?.image,
        },
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const updatePost = async (
  form: { title: string; content: string; img: string },
  session: SessionInterface,
  id: string | undefined
) => {
  try {
    const response = await fetch(`${serverUrl}/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: form.title,
        content: form.content,
        img: form.img,
        createdBy: {
          name: session.user?.name,
          email: session.user?.email,
          avatarUrl: session.user?.image,
        },
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};
