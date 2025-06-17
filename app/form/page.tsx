import LogoutButton from "@/components/Logout";
import Link from "next/link";

export default function Form() {

  const className = "border border-black";

  return (
    <div>
      Form details
      <div>
        <div>
          <label htmlFor="">ShopName</label>
          <input type="text" className={className} />
        </div>
        <div>
          <label htmlFor="">Address Line 1</label>
          <input type="text" className={className} />
        </div>
        <div>
          <label htmlFor="">Address Line 2</label>
          <input type="text" className={className} />
        </div>
        
      </div>
      <LogoutButton />
      <Link href={"/details"}>Company Details</Link>
    </div>
  );
}
