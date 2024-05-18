"use client";
import { Suspense } from "react";
import SearchBox from "./searchBarComponent";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center text-black w-full max-w-7xl px-4 py-10">
        <h1 className="text-4xl sm:text-6xl font-bold text-center">WikiGapAnalysis</h1>
        <h2 className="text-lg sm:text-2xl font-bold text-center mt-2">Analisis Kesenjangan Wikipedia</h2>
        <div className="flex justify-center items-center w-full bg-orange-50 mt-5 p-10 rounded-md max-w-3xl">
          <div className="flex flex-col w-full">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBox />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}













