"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  debounce?: number;
  onInputChange: (value: string) => void;
  initialValue: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  debounce = 500,
  onInputChange,
  initialValue,
  ...props
}) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onInputChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onInputChange]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchBox;
