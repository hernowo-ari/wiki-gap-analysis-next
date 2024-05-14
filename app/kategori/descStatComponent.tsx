import React from 'react'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DescStatisticsBox: React.FC = () => {
    const searchParams = useSearchParams();
    const [kategoriData, setKategoriData] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const queryParam = searchParams.get('nama_kategori') || '';
          const response = await axios.get(`http://hernowo12345.pythonanywhere.com/hasil_kategori/?nama_kategori=${encodeURIComponent(queryParam)}`);
          const data = response.data.data; 
          const extractedData = data.map((item: any) => item.attributes);
          setKategoriData(extractedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [searchParams]);
  
    return (
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col px-10 py-11 mx-auto w-full bg-white rounded-xl border border-solid shadow-sm border-neutral-700 text-neutral-700 max-md:px-5 max-md:mt-10">
          <div className="font-bold mx-4 text-3xl max-md:mx-2.5">
            Statistik Deskriptif
          </div>
          {kategoriData.map((item, index) => (
            <div key={index} className="flex gap-5 justify-between mt-11 text-1xl max-md:mt-10">
              <div className="flex flex-col">
                <div>Mean Kata</div>
                <div className="mt-3 max-md:mt-10">
                  Mean Blue-links
                </div>
                <div className="mt-3 max-md:mt-10">
                    Median Kata
                </div>
                <div className="mt-3 max-md:mt-10">
                Median Blue-links
                </div>
                <div className="mt-3 max-md:mt-10">
                  Deviasi Kata
                </div>
                <div className="mt-3 max-md:mt-10">
                Deviasi Blue-links
                </div>
                
              </div>
              <div className="flex flex-col self-start whitespace-nowrap">
              <div>{String(item.words_mean).slice(0, 6)}</div>
              <div className="mt-3 max-md:mt-10">{String(item.bluelinks_mean).slice(0, 6)}</div>
              <div className="mt-3 max-md:mt-10">{String(item.words_median).slice(0, 6)}</div>
              <div className="mt-3 max-md:mt-10">{String(item.bluelinks_median).slice(0, 6)}</div>
              <div className="mt-3 max-md:mt-10">{String(item.words_std).slice(0, 6)}</div>
              <div className="mt-3 max-md:mt-10">{String(item.bluelinks_std).slice(0, 6)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default DescStatisticsBox;

