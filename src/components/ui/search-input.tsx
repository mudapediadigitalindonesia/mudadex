"use client";

import * as React from "react";
import { CircleX, SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TokenSearchProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: React.Dispatch<React.SetStateAction<string>>;
}

export function TokenSearch({
  className,
  onSearch,
  ...props
}: TokenSearchProps) {
  const [value, setValue] = React.useState("");

  return (
    <div className={cn("relative", className)} {...props}>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e)=>onSearch?.(e.target.value)}
        className="pl-9 bg-[#1a1a1a]"
        placeholder="Search token name or address"
      />
      
    </div>
  );
}
