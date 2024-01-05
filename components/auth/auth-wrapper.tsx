import { Button } from "@/components/ui/button";
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

interface AuthWrapperProps {
  headerLabel: string;
  headerDescription: string;
  children: React.ReactNode;
  hasSocialLink: boolean;
  backLinkHref: string;
  backLinkLabel: string;
}

export default function AuthWrapper({
  headerLabel,
  headerDescription,
  children,
  hasSocialLink,
  backLinkHref,
  backLinkLabel,
}: AuthWrapperProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">{headerLabel}</CardTitle>
        <CardDescription>{headerDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex-col gap-2">
        {hasSocialLink && <Social />}

        {backLinkLabel && (
          <Button variant={"link"} className="text-xs font-normal">
            <Link href={backLinkHref}>{backLinkLabel}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
