"use client";
import { useRouter, useParams, usePathname } from "next/navigation";

function Page() {
  const router = useRouter();
  const { userName } = useParams<{ userName: string }>();
  const pathName = usePathname();
  console.log(router, userName, pathName);

  return <div>Page</div>;
}

export default Page;
