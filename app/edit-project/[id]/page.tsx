import { BlogInterface } from "@/common.types";
import BlogForm from "@/components/BlogForm";

import { getBlogByID } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  const result = (await getBlogByID(id)) as BlogInterface;

  if (session?.user.email !== result.createdBy.email) redirect("/");
  return (
    <>
      <h3 className="modal-head-text">Edit Project</h3>

      <BlogForm type="edit" session={session} blog={result} />
    </>
  );
};

export default EditProject;
