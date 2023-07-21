"use client";

import React, { useState } from "react";
import FormField from "./FormField";
import Button from "./Button";
import { BlogInterface, SessionInterface } from "@/common.types";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CommentArea = ({
  id,
  result,
  session,
}: {
  id: string;
  result: BlogInterface;
  session: SessionInterface;
}) => {
  const router = useRouter();

  const [form, setForm] = useState({
    comment: "",
    name: "",
    email: "",
  });
  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };
  const [isSubmitting, setIsSubbmiting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubbmiting(true);

    try {
      await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          type: "comment",
          comment: form.comment,
          name: session?.user?.name || form.name,
          email: session?.user?.email || form.email,
          avatarUrl: session?.user?.image,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
      setIsSubbmiting(false);
      setForm({ email: "", name: "", comment: ""});
    }
  };
  return (
    <div className="projects-grid px-16">
      <div>
        {result?.comments?.map((val: any, i) => (
          <div
            key={i}
            className="flex-1 flex items-start gap-5 w-full max-xs:flex-col mb-5"
          >
            <Image
              src={`${val?.avatarUrl || "/user.png"}`}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />

            <div className="flex-1 flexStart flex-col gap-1">
              <div className="w-full flexBetween">
                <p className="self-start text-lg font-semibold">{val?.name}</p>
              </div>

              <div className="flex self-start">{val?.comment}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <FormField
          title="Comment"
          isTextArea={true}
          state={form.comment}
          placeholder="good content guys..."
          setState={(value) => handleStateChange("comment", value)}
        />
        {!session?.user && (
          <div className="grid grid-cols-2 gap-5 mt-5">
            <FormField
              title="Name"
              state={form.name}
              placeholder="Abdurrahim"
              setState={(value) => handleStateChange("name", value)}
            />
            <FormField
              title="Email"
              state={form.email}
              placeholder="Abdurrahim@gmail.com"
              setState={(value) => handleStateChange("email", value)}
            />
          </div>
        )}

        <div className="mt-4 w-full">
          <Button
            title={"Add"}
            type="submit"
            leftIcon={isSubmitting ? "" : "/upload.svg"}
          />
        </div>
      </form>
    </div>
  );
};

export default CommentArea;
