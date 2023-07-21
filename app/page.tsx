import { BlogInterface } from "@/common.types";
import BlogCard from "@/components/BlogCard";
import LoadMore from "@/components/LoadMore";
import { fetchAllBlogs } from "@/lib/actions";

export default async function Home({ searchParams }: any) {
  const data = await fetchAllBlogs(Number(searchParams.page) || 0);

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
          pageNumber={Number(searchParams.page || 1)}
          isNext={searchParams.page * 4 > data.length || data.length === 0}
        />
      </div>
    </section>
  );
}
