"use client";

import { logout } from "@/context/AuthContext"
import { useRouter } from "next/navigation";

export default function LogoutButton () {
  const router = useRouter();
  const handleSubmit = async () => {
    const result = await logout();

    if (result?.success) {
      alert(result.message);
      router.push("/");
    }
  }

  return (
    <button onClick={() => handleSubmit()} className="border border-black">Logout</button>
  )
}