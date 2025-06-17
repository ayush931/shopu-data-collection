"use client";

import React, { useState } from "react";
import { login } from "@/context/AuthContext";
import LogoutButton from "@/components/Logout";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(() => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);

    if (result?.success) {
      alert(result.message);
      router.push("/form")
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeInput}
            className="border border-black"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChangeInput}
            className="border border-black"
          />
        </div>
        <button type="submit" className="border border-black">
          Login
        </button>
      </form>
     <LogoutButton />
    </div>
  );
}
