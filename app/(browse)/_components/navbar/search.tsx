"use client";
import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Search() {
  const router = useRouter();
  const [value, setValue] = useState(""); //검색어 입력을 받음

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      //http://localhost:3000?term=value
      {
        url: "/search", // /search 경로
        query: { term: value }, //?term=value
      },
      { skipEmptyString: true } //입력받은 값이 없으면 ""
    );
    router.push(url); //받은 검색어를 토대로 url를 생성후 push
  };
  const onClear = () => {
    setValue("");
  };

  return (
    <form
      className="relative w-full lg:w-[400px] flex items-center"
      onSubmit={onSubmit}
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          onClick={onClear}
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
}
