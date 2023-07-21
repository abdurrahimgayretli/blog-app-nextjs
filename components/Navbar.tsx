import Link from "next/link";
import React from "react";
import Button from "./Button";
import ProfileMenu from "./ProfileMenu";
import { getCurrentUser } from "@/lib/session";

const Navbar = async() => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href={"/"} className="logo">
          BLOG SITE
        </Link>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href={"/create-project"}>Share Blog</Link>
          </>
        ) : (
          <Link href={"/login"}>
            <Button title="Sign In" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
