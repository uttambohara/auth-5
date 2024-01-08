import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_URL } from "@/routes";

export default function Social() {
  function handleSocialClick(provider: "google" | "github") {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_URL,
    });
  }

  return (
    <div className="flex items-center gap-3 w-full justify-center">
      <div className="flex items-center gap-4">
        <button onClick={() => handleSocialClick("google")}>
          <FcGoogle size={50} />
        </button>
        <button onClick={() => handleSocialClick("github")}>
          <FaGithub size={50} />
        </button>
      </div>
    </div>
  );
}
