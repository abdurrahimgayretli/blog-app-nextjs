import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  content: string;
};

const BlogCard = ({ id, image, title, name, content }: Props) => {
  const summaryDesc = content?.slice(0, 100) + "...";

  return (
    <div className="flexCenter flex-row rounded-2xl gap-10">
      <Link
        href={`/project/${id}`}
        className="group relative w-full h-full"
      >
        <Image
          src={image}
          width={314}
          height={214}
          className="w-full h-full object-cover rounded-2xl"
          alt="Project Image"
        />
      </Link>

      <div className="flexCenter w-full h-full">
        <h1 className="font-semibold md:text-base sm:text-sm text-base">
          {title}
          <p className="mt-5 font-serif font-normal  md:text-base sm:text-sm text-sm">
            {summaryDesc}
          </p>
        </h1>
      </div>
    </div>
  );
};

export default BlogCard;
