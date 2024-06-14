import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const FetchedDateComponent = () => {
  const [formattedDatetime, setFormattedDatetime] = useState('');
  const [statusSub, setStatusSub] = useState('');
  const searchParams = useSearchParams();
  const namaKategori = searchParams.get('kategori') || '';
  const language = searchParams.get('language') || '';
  const subcategories = searchParams.get('subcategories') || '';

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/kategori/get/`, {
          params: {
            kategori: namaKategori,
            language,
            subcategories,
          },
        });
        const data = response.data.data;
        const createdAt = data.attributes.created_at;
        const subcategory = data.attributes.subcategories;
        const label = subcategory ? 'dengan sub-kategori' : 'tanpa sub-kategori';
        setStatusSub(label)

        const timestamp = new Date(createdAt);

        const year = timestamp.getFullYear();
        const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
        const day = timestamp.getDate().toString().padStart(2, '0');
        const hours = timestamp.getHours().toString().padStart(2, '0');
        const minutes = timestamp.getMinutes().toString().padStart(2, '0');

        const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}`;
        setFormattedDatetime(formattedDatetime);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    fetchData();
  }, [namaKategori, language, subcategories]);

  return (
    <div className="self-end mt-4 mb-8 text-2xl text-neutral-700 max-md:mt-10 max-md:max-w-full">
      Data diambil pada {formattedDatetime} GMT+7 ({statusSub})
    </div>
  );
};

export default FetchedDateComponent;
