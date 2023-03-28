import { api } from "@/utils/api";
import Link from "next/link";
import { FC } from "react";

interface dashboardProps {}

const DashBoard: FC<dashboardProps> = ({}) => {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-8 font-medium">
      <Link className="rounded-md bg-gray-100 p-2" href="/dashboard/opening">
        Opening Hours
      </Link>
      <Link className="rounded-md bg-gray-100 p-2" href="/dashboard/menu">
        Menu
      </Link>
    </div>
  );
};

export default DashBoard;
