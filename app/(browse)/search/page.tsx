import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: { term?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams) {
    redirect("/");
  }
  return <div className="h-full p-8 max-w-screen-2xl mx-auto">Search Page</div>;
}
