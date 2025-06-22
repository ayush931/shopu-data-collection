'use client';

import React, { useState, useEffect } from 'react';
import { login } from '@/context/AuthContext';
import LogoutButton from '@/components/Logout';
import { useRouter } from 'next/navigation';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/form'); // Redirect to form page if token exists
    }
  }, []);

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
      router.push('/form');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeInput}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={onChangeInput}
              className="relative w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-9"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
