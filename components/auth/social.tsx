import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

export default function Social() {
  return (
    <div className="flex items-center w-full gap-2">
      <Button className="flex-1" variant={"outline"}>
        <FcGoogle size={24} />
      </Button>
      <Button className="flex-1" variant={"outline"}>
        <FaGithub size={24} />
      </Button>
    </div>
  );
}
