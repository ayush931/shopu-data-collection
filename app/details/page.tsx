'use client';

import { getDetails } from '@/context/companyDataContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type CompanyData = {
  _id?: string;
  shopName?: string;
  addressLine1?: string;
  addressLine2?: string;
  state?: string;
  city?: string;
  phone?: number;
  pincode?: number;
  companyName?: Array<{ _id: string; name: string }>;
};

export default function CompanyDetails() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);

  useEffect(() => {
    const fetchedData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Session expired. Please login again.');
        router.push('/'); // Redirect to login page
        return;
      }

      const response = await getDetails();
      if (response?.success) {
        alert(response.message);
        console.log(response.data);
        setCompanyData(response.data.companyDetails);
      }
    };

    fetchedData();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Company Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companyData.length > 0 ? (
            companyData.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 shadow mb-4 flex flex-col gap-2"
              >
                <div>
                  <span className="font-semibold">Shop Name:</span>{' '}
                  {item.shopName}
                </div>
                <div>
                  <span className="font-semibold">Address Line 1:</span>{' '}
                  {item.addressLine1}
                </div>
                <div>
                  <span className="font-semibold">Address Line 2:</span>{' '}
                  {item.addressLine2}
                </div>
                <div>
                  <span className="font-semibold">State:</span> {item.state}
                </div>
                <div>
                  <span className="font-semibold">City:</span> {item.city}
                </div>
                <div>
                  <span className="font-semibold">Pincode:</span> {item.pincode}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {item.phone}
                </div>
                <div>
                  <span className="font-semibold">Company Name:</span>{' '}
                  {item.companyName && Array.isArray(item.companyName)
                    ? item.companyName.map((company) => company.name).join(', ')
                    : 'No company name selected'}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500">
              No company data found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
