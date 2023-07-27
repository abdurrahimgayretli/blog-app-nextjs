import { BlogInterface } from "@/common.types";
import BlogCard from "@/components/BlogCard";
import LoadMore from "@/components/LoadMore";
import { fetchAllBlogs } from "@/lib/actions";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export default async function Home({ searchParams }: any) {
  const page = searchParams.page !== undefined ? Number(searchParams.page) : 0;

  const data = await fetchAllBlogs(page);

  return (
    <section className="flexCenter flex-col paddings mb-16">
      <section className="projects-grid">
        {data.map((blog: BlogInterface) => (
          <BlogCard
            key={blog?._id}
            id={blog?._id}
            image={blog?.img}
            title={blog?.title}
            createdBy={blog?.createdBy}
            content={blog?.content}
          />
        ))}
      </section>
      <div>
        <LoadMore
          pageNumber={Number(searchParams.page || 0)}
          isNext={4 === data.length}
          length={data.length}
        />
      </div>
    </section>
  );
}
