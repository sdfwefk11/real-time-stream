"use client";
import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  value: string | null;
}

export function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const onCopy = () => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value); //버튼 누르면 자동으로 복사
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
