"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Settings() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const session = useSession();

  useEffect(() => setHasLoaded(true), []);

  if (!hasLoaded) return null;

  return (
    <div>
      <div>{JSON.stringify(session.data)}</div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}
