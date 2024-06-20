"use client";
import { Suspense } from "react";
import SearchBox from "./searchBarComponent";
import Footer from './footer';
import CategorySuggestionBox, { Category } from './suggestion';

export default function Home() {
  const categories: Category[] = [
    { language: 'id', nama_kategori: 'Perang', subcategories: false },
    { language: 'id', nama_kategori: 'Industri musik', subcategories: false },
    { language: 'id', nama_kategori: 'Permainan video', subcategories: false },
    { language: 'id', nama_kategori: 'Kelas sosial', subcategories: false },
    { language: 'id', nama_kategori: 'Tujuh Keajaiban Dunia', subcategories: false },
    { language: 'id', nama_kategori: 'Dosen Universitas Indonesia', subcategories: false },
    { language: 'id', nama_kategori: 'Pahlawan Nasional Indonesia', subcategories: false },
    { language: 'id', nama_kategori: 'Literasi', subcategories: false },
    { language: 'id', nama_kategori: 'Peradaban', subcategories: false },
    { language: 'id', nama_kategori: 'Agama', subcategories: false },

    { language: 'en', nama_kategori: 'War', subcategories: false },
    { language: 'en', nama_kategori: 'Music Industry', subcategories: false },
    { language: 'en', nama_kategori: 'Video games', subcategories: false },
    { language: 'en', nama_kategori: 'Social classes', subcategories: false },
    { language: 'en', nama_kategori: 'Seven Wonders of the Ancient World', subcategories: false },
    { language: 'en', nama_kategori: 'Academic staff of the university of Indonesia', subcategories: false },
    { language: 'en', nama_kategori: 'National heroes of Indonesia', subcategories: false },
    { language: 'en', nama_kategori: 'Literacy', subcategories: false },
    { language: 'en', nama_kategori: 'Civilizations', subcategories: false },
    { language: 'en', nama_kategori: 'Religious demographics', subcategories: false },

    // Add more categories as needed
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col justify-center items-center flex-grow">
        <div className="flex flex-col justify-center items-center text-black w-full max-w-7xl px-4 py-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-center">WikiGapAnalysis</h1>
          <h2 className="text-lg sm:text-2xl font-bold text-center mt-2">Analisis Kesenjangan Wikipedia</h2>
          <div className="flex justify-center items-center w-full bg-orange-50 mt-5 mb-60 rounded-md max-w-5xl">
            <div className="flex flex-col w-full">
              <Suspense fallback={<div>Loading...</div>}>
                <SearchBox />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-3/5">
            <Suspense fallback={<div>Loading...</div>}>
              <CategorySuggestionBox categories={categories} />
            </Suspense>
          </div>
      </main>
      <Footer />
    </div>
  );
}
