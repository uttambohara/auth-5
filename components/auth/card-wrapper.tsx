"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import Social from "./social";

interface CardWrapperProps {
  heading: string;
  description: string;
  hasSocialIcons: boolean;
  backHref: string;
  backMessage: string;
  children: React.ReactNode;
}

export default function CardWrapper({
  heading,
  description,
  hasSocialIcons = false,
  backHref,
  backMessage,
  children,
}: CardWrapperProps) {
  return (
    <Card className="w-[24rem]">
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
        <CardDescription>
          {description}{" "}
          <Link href={backHref} className="text-blue-500 cursor-pointer">
            {backMessage}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{hasSocialIcons && <Social />}</CardFooter>
    </Card>
  );
}
