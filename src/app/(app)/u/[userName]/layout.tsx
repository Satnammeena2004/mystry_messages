import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  params: Promise<{ userName: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userName } = await params;

  return {
    title: userName + " | Anonify",
  };
}
const UserLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default UserLayout;
