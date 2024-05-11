"use client";

import AdminPanel from "@/components/AdminPanel";
import SearchAsset from "@/components/SearchAsset";
import SearchPage from "@/components/SearchPage";

export default function Home() {
  return (
    <main className="flex">
      <div className="p-12 flex justify-center items-center w-full">
        <AdminPanel />
      </div>
      <div className="p-12 flex justify-center items-center w-full">
        <SearchPage />
      </div>
      <div className="p-12 flex justify-center items-center w-full">
        <SearchAsset />
      </div>
    </main>
  );
}
