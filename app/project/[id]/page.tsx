import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { getBlogByID } from "@/lib/actions";
import { BlogInterface } from "@/common.types";
import BlogActions from "@/components/BlogActions";
import CommentArea from "@/components/CommentArea";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getBlogByID(id)) as BlogInterface;

  if (!result)
    return <p className="no-result-text">Failed to fetch project info</p>;

  const blogDetails = result;

  const renderLink = () => `/profile/${blogDetails?.createdBy?.name}`;

  return (
    <section className="flexCenter flex-col gap-4">
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full mt-5">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={blogDetails?.createdBy?.avatarUrl || "/user.png"}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {blogDetails?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>{blogDetails?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
            </div>
          </div>
        </div>

        {session?.user?.email === blogDetails?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <BlogActions projectId={id} />
          </div>
        )}
      </section>

      <div className="mt-14">
        <Image
          src={`${blogDetails?.img}`}
          className="object-cover rounded-2xl w-full h-full"
          width={500}
          height={500}
          alt="poster"
        />
      </div>

      <section className="flexCenter flex-col mt-14">
        <p className="max-w-5xl text-xl font-normal">{blogDetails?.content}</p>
      </section>

      <section className="flexCenter w-full mt-14">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={blogDetails?.createdBy?.avatarUrl || "/vercel.svg"}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>
      <CommentArea result={result} id={id} session={session} />
    </section>
  );
};

export default Project;
