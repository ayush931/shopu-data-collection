"use client";

import { logout } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }
    const result = await logout();

    if (result?.success) {
      alert(result.message);
      router.push("/");
    }
  };

  return (
    <button
      onClick={() => handleSubmit()}
      className="border border-black px-5 py-1"
    >
      Logout
    </button>
  );
}
