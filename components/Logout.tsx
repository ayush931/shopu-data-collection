'use client';

import { logout } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingButton from './LoadingButton';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please login first');
      setLoading(false);
      return;
    }
    const result = await logout();

    if (result?.success) {
      toast.success(result.message);
      setLoading(false);
      router.push('/');
    }
  };

  return (
    <button
      onClick={() => handleSubmit()}
      className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-[500]"
    >
      {loading ? <LoadingButton /> : 'Logout'}
    </button>
  );
}
