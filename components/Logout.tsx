'use client';

import { logout } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LogoutButton() {
  const router = useRouter();
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please login first');
      return;
    }
    const result = await logout();

    if (result?.success) {
      toast.success(result.message);
      router.push('/');
    }
  };

  return (
    <button
      onClick={() => handleSubmit()}
      className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-[500]"
    >
      Logout
    </button>
  );
}
