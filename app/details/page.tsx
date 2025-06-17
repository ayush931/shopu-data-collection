"use client";

import { getDetails } from "@/context/dataContext"
import { useEffect, useState } from "react"

type CompanyData = {
  shopName?: string;
  addressLine1?: string;
  addressLine2?: string;
  state?: string;
  city?: string;
  phone?: number
  pincode?: number
};

export default function CompanyDetails () {

  const [companyData, setCompanyData] = useState<CompanyData[]>([]);

  useEffect(() => {
    const fetchedData = async () => {
      const response = await getDetails();
      if (response?.success) {
        alert(response.message)
        console.log(response.data);
        setCompanyData(response.data.companyDetails);
      }
    }

    fetchedData();
  }, [])

  return (
    <div>
      {
        companyData.length > 0 && companyData.map((item, index) => {
          return (
            <div key={index}>
              <div>{item.shopName}</div>
              <div>{item.addressLine1}</div>
              <div>{item.addressLine2}</div>
              <div>{item.state}</div>
              <div>{item.city}</div>
              <div>{item.pincode}</div>
              <div>{item.phone}</div>
            </div>
          )
        })
      }
    </div>
  )
}