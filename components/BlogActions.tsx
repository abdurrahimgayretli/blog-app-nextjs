"use client";

import { deleteBlog } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BlogActions = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isDeleting, setisDeleting] = useState(false);

  const handleDeleteProject = async () => {
    setisDeleting(true);

    try {
      await deleteBlog(projectId, -1);

      router.refresh();
      router.push("/");
    } catch (error) {
    } finally {
      setisDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src={"/pencile.svg"} width={15} height={15} alt="edit" />
      </Link>
      <button
        onClick={handleDeleteProject}
        type="button"
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
      >
        <Image src={"/trash.svg"} width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default BlogActions;
