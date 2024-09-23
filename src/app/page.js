import Button from "@/components/Button";
import { commonApiCall, fetchData } from "@/service/Api";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const handleFetchData = async () => {
    try {
      let fromData = new FormData();
      fromData.append("Action", 4);
      fromData.append("ModuleId", "C4A38D74-24BC-11EF-91AE-02C7682B2D6D");
      const data = await commonApiCall("/api/Form/GetDashboard", fromData);
      console.log(data);
      // const data = await fetchData()
      debugger;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1>Home Page</h1>
      <Link href="/Login">Go to Login</Link>
    </div>
  );
}
