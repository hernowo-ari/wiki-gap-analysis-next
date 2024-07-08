"use client";
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import LeftTable from "./leftBoxComponent";
import SearchBox from "../searchBarComponent";
import LorenzCurveSVG from "./lorenzCurveComponent";
import LeftOverlayBox from "./leftTableOverlayComponent";
import DescStatisticsBox from "./descStatComponent";
import FetchedDateComponent from "./fetchedDateComponent";

function DashboardContent() {
  const searchParams = useSearchParams();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [wordCountData, setWordCountData] = useState<number[]>([]);
  const [bluelinksCountData, setBluelinksCountData] = useState<number[]>([]);
  const [charCountData, setCharCountData] = useState<number[]>([]);
  const [articlesData, setArticlesData] = useState([]);

  const [hasilData, setHasilData] = useState<number[]>([]);
  const [wordGiniData, setWordGiniData] = useState<number>(0);
  const [bluelinksGiniData, setBluelinksGiniData] = useState<number>(0);
  const [charGiniData, setCharGiniData] = useState<number>(0);

  const [memberCount, setMemberCount] = useState<number>(0);
  const [subcategories, setSubcategories] = useState<boolean>(false);
  const [createdAt, setCreatedAt] = useState<string>('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const namaKategori = searchParams.get('kategori') || '';
        const language = searchParams.get('language') || '';
        const subcategories = searchParams.get('subcategories') || '';

        // Fetch articles data
        const articlesResponse = await axios.get(`${apiUrl}/artikel/`, {
          params: {
            kategori: encodeURIComponent(namaKategori),
            language: encodeURIComponent(language),
            subcategories: encodeURIComponent(subcategories),
          },
        });
        const articlesData = articlesResponse.data.data;
        const sortedData = articlesData.sort((a: any, b: any) => a.attributes.word_count - b.attributes.word_count);

        const wordCountData = articlesData.map((item: any) => item.attributes.word_count);
        const bluelinksCountData = articlesData.map((item: any) => item.attributes.bluelinks_count);
        const charCountData = articlesData.map((item: any) => item.attributes.char_count);

        setArticlesData(sortedData);
        setWordCountData(wordCountData);
        setBluelinksCountData(bluelinksCountData);
        setCharCountData(charCountData);

        // Fetch Gini scores data
        const hasilResponse = await axios.get(`${apiUrl}/hasil_kategori/get/`, {
          params: {
            kategori: encodeURIComponent(namaKategori),
            subcategories: encodeURIComponent(subcategories),
          },
        });
        const hasilKategoriData = hasilResponse.data.data.attributes;
        console.log(hasilKategoriData);
        const wordsGiniScore = hasilKategoriData.words_gini_score;
        const bluelinksGiniScore = hasilKategoriData.bluelinks_gini_score;
        const charGiniScore = hasilKategoriData.char_gini_score;

        setHasilData(hasilKategoriData)
        setWordGiniData(wordsGiniScore);
        setBluelinksGiniData(bluelinksGiniScore);
        setCharGiniData(charGiniScore);

        const kategoriResponse = await axios.get(`${apiUrl}/kategori/get/`, {
          params: {
            kategori: namaKategori,
            language,
            subcategories,
          },
        });
        const kategoriData = kategoriResponse.data.data.attributes;

        setMemberCount(kategoriData.member_count);
        setSubcategories(kategoriData.subcategories);
        setCreatedAt(kategoriData.created_at);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchParams]); // Add searchParams as a dependency

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {isOverlayOpen && <LeftOverlayBox onClose={closeOverlay} data={articlesData} />}
      </Suspense>
      
      <div className="flex justify-center items-center px-16 bg-orange-50 max-md:px-5">
        <div className="flex flex-col mt-4 max-w-[1920px] max-w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBox />
          </Suspense>
          <div className="mt-8 max-md:max-w-full">
            <div className="flex justify-center gap-8 max-md:flex-col max-md:gap-0">
              <Suspense fallback={<div>Loading...</div>}>
                <LeftTable data={articlesData} memberCount={memberCount} onOpenOverlay={openOverlay} />
              </Suspense>
    
              <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                  <div className="px-px max-md:max-w-full">
                    <div className="flex gap-8 max-md:flex-col max-md:gap-0">
                      <Suspense fallback={<div>Loading...</div>}>
                        <DescStatisticsBox data={hasilData}/>
                      </Suspense>
                      <Suspense fallback={<div>Loading...</div>}>
                        <LorenzCurveSVG attr="word_count" data={wordCountData} gini={wordGiniData}/>
                      </Suspense>
                    </div>
                  </div>
                  <div className="px-px mt-8 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-8 max-md:flex-col max-md:gap-0">
                      <Suspense fallback={<div>Loading...</div>}>
                        <LorenzCurveSVG attr="bluelinks_count" data={bluelinksCountData} gini={bluelinksGiniData}/>
                      </Suspense>
                      <Suspense fallback={<div>Loading...</div>}>
                        <LorenzCurveSVG attr="char_count" data={charCountData} gini={charGiniData} />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
          <FetchedDateComponent createdAt={createdAt} subcategories={subcategories} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default DashboardContent;
