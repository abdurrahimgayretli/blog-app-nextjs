import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  image: string;
  title: string;
  content: string;
  createdBy: { name: string; email: string; avatarUrl: string | undefined };
};

const BlogCard = ({ id, image, title, content, createdBy }: Props) => {
  const summaryDesc = content?.slice(0, 200) + "...";

  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-md mb-10">
      <div className="relative">
        <Image
          src={image}
          alt="Arka Plan Resmi"
          className="w-full h-full object-cover rounded-2xl"
          fill
        />
        <div className="absolute top-0 left-0 w-full h-full bg-blur"></div>
        <div className="relative z-10 ">
          <Link
            data-test="blogCard"
            href={`/project/${id}`}
            className="flexCenter group relative h-[30vh] w-[30vw]"
          >
            <Image
              src={image}
              className="w-full h-full object-contain object-center"
              fill
              alt="Blog Image"
            />
          </Link>
        </div>
      </div>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/`}>
          <div className="flexCenter gap-2">
            <Image
              src={createdBy?.avatarUrl || "/user.png"}
              width={24}
              height={24}
              className="rounded-full"
              alt="Blog Image"
            />
            <p>{createdBy?.name}</p>
          </div>
        </Link>
        <div className="">
          <h1 className="w-full capitalize">{title}</h1>
        </div>
      </div>
      <p className="m-10 h-16">{summaryDesc}</p>
    </div>
  );
};

export default BlogCard;
