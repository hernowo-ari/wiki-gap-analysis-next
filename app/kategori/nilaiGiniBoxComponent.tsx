import React from 'react'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const NilaiGiniBoxComponent: React.FC = () => {
    const searchParams = useSearchParams();
    const [kategoriData, setKategoriData] = useState<any[]>([]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const queryParam = searchParams.get('kategori') || '';
          const subcategories = searchParams.get('subcategories') || '';
          const response = await axios.get(`${apiUrl}/hasil_kategori/?kategori=${encodeURIComponent(queryParam)}&subcategories${subcategories}`);
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
          <div className="font-bold mx-6 text-4xl max-md:mx-2.5">
            Nilai Indeks Gini
          </div>
          {kategoriData.map((item, index) => (
            <div key={index} className="flex gap-5 justify-between mt-11 text-2xl max-md:mt-10">
              <div className="flex flex-col">
                <div>Jumlah Kata</div>
                <div className="mt-12 max-md:mt-10">
                  Jumlah Blue-links
                </div>
                <div className="mt-12 max-md:mt-10">
                  Jumlah Karakter
                </div>
              </div>
              <div className="flex flex-col self-start whitespace-nowrap">
              <div>{String(item.words_gini_score).slice(0, 6)}</div>
              <div className="mt-12 max-md:mt-10">{String(item.bluelinks_gini_score).slice(0, 6)}</div>
              <div className="mt-12 max-md:mt-10">{String(item.char_gini_score).slice(0, 6)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default NilaiGiniBoxComponent;

