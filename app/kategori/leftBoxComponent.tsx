import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const LeftTable: React.FC<{ onOpenOverlay: () => void }> = ({ onOpenOverlay }) => {
  const searchParams = useSearchParams();
  const [kategoriData, setKategoriData] = useState([]);

  useEffect(() => {
    // Fetch data based on query parameter
    const fetchData = async () => {
      try {
        const queryParam = searchParams.get('nama_kategori') || '';
        const response = await axios.get(`https://hernowo12345.pythonanywhere.com/artikel/?nama_kategori=${encodeURIComponent(queryParam)}`);
        const sortedData = response.data.data.sort((a: any, b: any) => a.attributes.word_count - b.attributes.word_count);
        const reversedData = sortedData.slice().reverse();
        setKategoriData(reversedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow px-9 pt-12 pb-12 mx-auto w-full text-base bg-white rounded-xl border border-solid border-neutral-700 text-neutral-700 max-md:px-5 max-md:mt-10">
        <div className="text-3xl font-bold">
          Informasi Kekayaan Artikel
        </div>
        {kategoriData.slice(0, 5).map((item: any, index: number) => (
          <div key={index}>
            <div className="font-bold mt-6 text-1xl max-md:mt-4">{item.attributes.judul}</div>
            <div className="flex gap-14 mt-1.5">
              <div>Jumlah Kata</div>
              <div className="flex-auto">{item.attributes.word_count}</div>
            </div>
            <div className="flex gap-4 mt-2">
              <div>Jumlah Blue-links</div>
              <div className="flex-auto">{item.attributes.bluelinks_count}</div>
            </div>
          </div>
        ))}
        <button onClick={onOpenOverlay} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Show More
        </button>
      </div>
    </div>
  );
};

export default LeftTable;

