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
      className="border border-black px-5 py-1"
    >
      Logout
    </button>
  );
}
