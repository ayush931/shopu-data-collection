"use client";

import LogoutButton from "@/components/Logout";
import { createCompany, getCompanyName } from "@/context/companyDataContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  type Company = { _id: string; name: string };

  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [formData, setFormData] = useState({
    shopName: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
  });

  useEffect(() => {
    const fetchedData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        router.push("/"); // Redirect to login page
        return;
      }
      const response = await getCompanyName();
      if (response?.success) {
        setCompanies(response.data.companyNameDetails);
      }
    };

    fetchedData();
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

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompanySelect = (company: Company) => {
    if (!selectedCompanies.find((selected) => selected._id === company._id)) {
      setSelectedCompanies([...selectedCompanies, company]);
    }
    setSearchTerm("");
    setShowDropDown(false);
  };

  const removeSelectedCompany = (companyId: string) => {
    setSelectedCompanies(
      selectedCompanies.filter((company) => company._id !== companyId)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropDown(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      shopName: formData.shopName.trim(),
      addressLine1: formData.addressLine1.trim(),
      addressLine2: formData.addressLine2.trim(),
      state: formData.state.trim(),
      city: formData.city.trim(),
      pincode: formData.pincode.trim(),
      phone: formData.phone.trim(),
      companyName: selectedCompanies.map((company) => company._id),
    };

    const response = await createCompany(payload);
    if (response) {
      alert("Company data created successfully");
      setFormData({
        shopName: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        city: "",
        pincode: "",
        phone: "",
      });
      setSelectedCompanies([]);
    } else {
      alert("Failed to save data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Company Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="shopName"
                className="block text-sm font-medium mb-1"
              >
                Shop Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="shopName"
                value={formData.shopName}
                onChange={onChangeInput}
              />
            </div>
            <div>
              <label
                htmlFor="addressLine1"
                className="block text-sm font-medium mb-1"
              >
                Address Line 1
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={onChangeInput}
              />
            </div>
            <div>
              <label
                htmlFor="addressLine2"
                className="block text-sm font-medium mb-1"
              >
                Address Line 2
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={onChangeInput}
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-1">
                State
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="state"
                value={formData.state}
                onChange={onChangeInput}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="city"
                value={formData.city}
                onChange={onChangeInput}
              />
            </div>
            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium mb-1"
              >
                Pincode
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="pincode"
                value={formData.pincode}
                onChange={onChangeInput}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="phone"
                value={formData.phone}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Company name
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedCompanies.map((company) => (
                <span
                  key={company._id}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center"
                >
                  {company.name}
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => removeSelectedCompany(company._id)}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={searchTerm}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearchChange}
              onFocus={() => setShowDropDown(true)}
            />
            {showDropDown && searchTerm && (
              <div className="bg-white border border-gray-300 rounded shadow mt-1 max-h-40 overflow-y-auto z-10 absolute w-full">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.slice(0, 50).map((company) => (
                    <button
                      key={company._id}
                      type="button"
                      className="block w-full text-left px-3 py-2 hover:bg-blue-100"
                      onClick={() => handleCompanySelect(company)}
                    >
                      {company.name}
                      {selectedCompanies.find(
                        (select) => select._id === company._id
                      ) && (
                        <span className="ml-2 text-xs text-green-600">
                          (selected)
                        </span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500">
                    No company found
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        {selectedCompanies.length > 0 && (
          <div className="mt-4">
            <div className="font-semibold mb-2">
              Selected companies ({selectedCompanies.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCompanies.map((company) => (
                <div
                  key={company._id}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {company.name}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mt-6">
          <LogoutButton />
          <Link href={"/details"} className="text-blue-600 hover:underline">
            Company Details
          </Link>
        </div>
      </div>
    </div>
  );
}
