"use client";

import LogoutButton from "@/components/Logout";
import { createCompany, getCompanyName } from "@/context/companyDataContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Form() {
  const className = "border border-black";
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
      const response = await getCompanyName();
      if (response?.success) {
        console.log(response.data.companyNameDetails);
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
    <div>
      Form details
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">ShopName</label>
          <input
            type="text"
            className={className}
            name="shopName"
            value={formData.shopName}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Address Line 1</label>
           <input
            type="text"
            className={className}
            name="addressLine1"
            value={formData.addressLine1}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Address Line 2</label>
          <input
            type="text"
            className={className}
            name="addressLine2"
            value={formData.addressLine2}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">State</label>
          <input
            type="text"
            className={className}
            name="state"
            value={formData.state}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">City</label>
          <input
            type="text"
            className={className}
            name="city"
            value={formData.city}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Pincode</label>
          <input
            type="number"
            className={className}
            name="pincode"
            value={formData.pincode}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Phone</label>
          <input
            type="number"
            className={className}
            name="phone"
            value={formData.phone}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="">Company name</label>
          {/* Removed invalid usage of selectedCompanies.name */}
          {selectedCompanies.map((company) => {
            return (
              <>
                <span key={company._id}>
                  {company.name}
                </span>
                <button onClick={() => removeSelectedCompany(company._id)}>x</button>
              </>
            )
          })}
        </div>

        <input type="text" value={searchTerm} className={className} onChange={handleSearchChange} onFocus={() => setShowDropDown(true)} />
        {showDropDown && searchTerm && (
          <div>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.slice(0, 50).map((company) => {
                return (
                  <>
                    <button key={company._id} type="button" onClick={() => handleCompanySelect(company)}>
                      <div>
                        {company.name}
                        {selectedCompanies.find(
                          (select) => select._id === company._id
                        ) && <span>(selected)</span>}
                      </div>
                    </button>
                    
                  </>
                )
              })
            ): <div>No company found</div>}
          </div>
        )}
        <button type="submit">Submit</button>
        {showDropDown && (
          <div onClick={() => setShowDropDown(false)} />
        )}
      </form>
      {selectedCompanies.length > 0 && (
        <div>
          <div>
            selected companies ({selectedCompanies.length})
          </div>
          <div>
            {selectedCompanies.map((company) => (
              <div key={company._id}>{company.name}</div>
            ))}
          </div>
        </div>
      )}
      <LogoutButton />
      <Link href={"/details"}>Company Details</Link>
    </div>
  );
}
