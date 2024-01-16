import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

interface CreatorProps {
  params: {
    username: string;
  };
  children: React.ReactNode;
}

export default async function CreatorLayout({
  params,
  children,
}: CreatorProps) {
  const self = await getSelfByUsername(params.username);
  if (!self) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
