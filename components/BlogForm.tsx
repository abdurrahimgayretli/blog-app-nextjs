"use client";
import "react-image-crop/dist/ReactCrop.css";
import { BlogInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import Button from "./Button";
import { fetchPost, updatePost, uploadImage } from "@/lib/actions";
import { useRouter } from "next/navigation";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  PixelCrop,
} from "react-image-crop";

type Props = {
  type: string;
  session: SessionInterface;
  blog?: BlogInterface;
};

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const BlogForm = ({ type, session, blog }: Props) => {
  const router = useRouter();

  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 100,
    height: 100,
  });
  const [aspect] = useState(undefined);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isSubmitting, setIsSubbmiting] = useState(false);
  const [form, setForm] = useState({
    image: blog?.img || "",
    title: blog?.title || "",
    content: blog?.content || "",
  });
  const [size, setSize] = useState({ width: 0, height: 0 });

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubbmiting(true);

    const imageUrl = await uploadImage(form.image, completedCrop || crop, size);
    const title = form.title;
    const content = form.content;
    const img = imageUrl.url;

    if (imageUrl.url) {
      try {
        if (type === "create") {
          fetchPost({ title, content, img }, session);
          router.refresh();
          router.push("/");
        }

        if (type === "edit") {
          updatePost({ title, content, img }, session, blog?._id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        router.refresh();
        router.push("/");
        setIsSubbmiting(false);
      }
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

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart gap-5">
        <label htmlFor="poster" className="flexCenter">
          {!form.image && "Choose a poster for your project"}
        </label>
        {form.image && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <Image
              id="img"
              src={form?.image}
              className="object-cover w-full h-full"
              alt="Project poster"
              width={414}
              height={314}
              onLoad={onImageLoad}
              onLoadingComplete={(e) => {
                setSize({
                  width: e.clientWidth,
                  height: e.clientHeight,
                });
              }}
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
