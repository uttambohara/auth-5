import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Social() {
  return (
    <div className="flex items-center gap-3 w-full justify-center">
      <div className="flex items-center gap-4">
        <button>
          <FcGoogle size={50} />
        </button>
        <button>
          <FaGithub size={50} />
        </button>
      </div>
    </div>
  );
}
