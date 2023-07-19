import { BlogInterface } from "@/common.types";
import BlogCard from "@/components/BlogCard";
import { fetchAllBlogs } from "@/lib/actions";
import Image from "next/image";

type BlogSearch = {
  blogSearch: {
    edges: { node: BlogInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

type SearchParams = {
  category?: string;
  endcursor?: string;
};

type Props = {
  searchParams: SearchParams;
};

export default async function Home() {
  const data = await fetchAllBlogs();
  console.log(data);
  

  const projectsToDisplay = data?.projectSearch?.edges || [];
  return (
    <section className="flex-start flex-col paddings mb-16">
      <section className="projects-grid">
        {data.map((blog:any) => (
          <BlogCard
            key={blog?.id}
            id={blog?.id}
            image={blog?.image}
            title={blog?.title}
            name={blog?.createdBy?.name || blog?.name}
            content={blog?.content}
          />
        ))}
      </section>
    </section>
  );
}
