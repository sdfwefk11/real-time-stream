import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ResultSkeleton, Results } from "./_components/results";

interface SearchPageProps {
  searchParams: { term?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams) {
    redirect("/");
  }
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  );
}
