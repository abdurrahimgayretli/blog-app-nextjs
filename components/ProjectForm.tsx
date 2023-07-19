"use client";
import "react-image-crop/dist/ReactCrop.css";
import { BlogInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import Button from "./Button";
import { createNewBlog, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
import ReactCrop, { type Crop } from "react-image-crop";

type Props = {
  type: string;
  session: SessionInterface;
  blog?: BlogInterface;
};

const BlogForm = ({ type, session, blog }: Props) => {
  const router = useRouter();

  const [crop, setCrop] = useState<Crop>({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = form.title;
    const content = form.content;
    const img = form.image;

    setIsSubbmiting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            title,
            content,
            img,
            username: session.user.id,
          }),
        });

        router.push("/");
      }

      if (type === "edit") {
        //await updateProject(form, project?.id as string, token);

        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubbmiting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const [isSubmitting, setIsSubbmiting] = useState(false);
  const [form, setForm] = useState({
    image: blog?.image || "",
    title: blog?.title || "",
    content: blog?.content || "",
  });

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart gap-5">
        <label htmlFor="poster" className="flexCenter">
          {!form.image && "Choose a poster for your project"}
        </label>
        {form.image && (
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <Image
              src={form?.image}
              className="object-cover"
              alt="Project poster"
              width={500}
              height={500}
            />
          </ReactCrop>
        )}
        <input
          type="file"
          id="image"
          accept="image/*"
          required={type === "create"}
          className=""
          onChange={handleChangeImage}
        />
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        isTextArea={true}
        title="Content"
        state={form.content}
        placeholder="Showcase and discover remakable developer projects."
        setState={(value) => handleStateChange("content", value)}
      />
      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default BlogForm;
