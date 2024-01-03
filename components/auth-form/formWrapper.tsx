"use client";

// Card
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

// Icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

interface FormWrapperProps {
  cardTitle: string;
  cardDescription: string;
  children: React.ReactNode;
  hasSocialIcons?: boolean;
  backNavigationMessage?: string;
  backNavigationhref: string;
}

export default function FormWrapper({
  cardTitle,
  cardDescription,
  hasSocialIcons,
  backNavigationMessage,
  backNavigationhref,
  children,
}: FormWrapperProps) {
  const router = useRouter();

  //
  function handleNavigate() {
    router.push(backNavigationhref);
  }

  return (
    <Card className="w-[25rem]">
      <CardHeader className="text-center">
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col w-full">
        {hasSocialIcons && (
          <div className="flex items-center gap-2 w-full justify-center">
            <Button variant={"outline"} className="flex-1">
              <FcGoogle size={25} />
            </Button>
            <Button variant={"outline"} className="flex-1">
              <FaGithub size={25} />
            </Button>
          </div>
        )}

        {backNavigationMessage && (
          <Button
            variant={"link"}
            className="font-normal mt-4"
            onClick={handleNavigate}
          >
            {backNavigationMessage}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
