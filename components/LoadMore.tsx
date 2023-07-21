"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

const LoadMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    return newPathname;
  };

  const handleNavigation = () => {
    const newLimit = Number(pageNumber + 1);
    const newPathName = updateSearchParams("page", `${newLimit}`);

    router.push(newPathName);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <Button
          title="Show More"
          type="button"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default LoadMore;
