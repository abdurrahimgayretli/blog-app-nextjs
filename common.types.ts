import { User, Session } from "next-auth";

export type FormState = {
  title: string;
  content: string;
  image: string;
};

export interface BlogInterface {
  title: string;
  content: string;
  image: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string | null;
    id: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
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
    id: string;
    username: string;
    email: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
}
