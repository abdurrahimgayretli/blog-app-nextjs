import { User, Session } from "next-auth";

export type FormState = {
  title: string;
  content: string;
  image: string;
};

export interface BlogInterface {
  title: string;
  content: string;
  img: string;
  _id: string;
  comments: [
    { comment: string; name: string; email: string; avatarUrl?: string }
  ];
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string | undefined;
  };
}

export interface BlogMockInterface {
  title: string;
  content: string;
  img: string;
  id: string;
  name: string;
  email: string;
  avatarUrl: string | undefined;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  blogs: {
    edges: { node: BlogInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface SessionInterface extends Session {
  user: User & {
    _id: string;
    username: string;
    email: string;
    avatarUrl?: string;
  };
}

export interface BlogForm {
  title: string;
  description: string;
  image: string;
}
