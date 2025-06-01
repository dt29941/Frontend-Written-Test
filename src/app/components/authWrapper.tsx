"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
 
      router.push("/");
    }
  }, [session, status, router]);


  if (status === "loading" || !session) {
    return null; //
  }

  return <>{children}</>;
};

export default AuthWrapper;