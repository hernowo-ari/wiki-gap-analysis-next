"use client";
import { Suspense } from "react";
import SearchBox from "./searchBarComponent";

export default function Home() {
  return (
    <main>  
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center h-3/4 text-black">
          <h1 className="text-6xl font-bold">WikiGapAnalysis</h1>
          <h1 className="text-2xl font-bold">Analisis Kesenjagan Wikipedia</h1>
          <div className="flex justify-center items-center px-16 py-10 bg-orange-50 max-md:px-5">
            {/* <div className="flex flex-col max-w-full w-[1299px]">
              <Suspense fallback={<div>Loading...</div>}>
                <SearchBox />
              </Suspense>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}












