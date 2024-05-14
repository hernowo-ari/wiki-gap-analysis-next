import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface overlayLeftTableProps {
    onClose: () => void;
  }
  
  const LeftOverlayBox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const searchParams = useSearchParams();
    const [kategoriData, setKategoriData] = useState<any[]>([]);
    const [judul, setJudul] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  
    useEffect(() => {
      // Fetch data based on query parameter
      const fetchData = async () => {
        try {
          const queryParam = searchParams.get('nama_kategori') || '';
          const response = await axios.get(`https://hernowo12345.pythonanywhere.com/artikel/?nama_kategori=${encodeURIComponent(queryParam)}`);
          const sortedData = response.data.data.sort((a: any, b: any) => a.attributes.word_count - b.attributes.word_count);
          const reversedData = sortedData.slice().reverse();
          const judulArtikel = reversedData[0]?.attributes.nama_kategori || '';
          setJudul(judulArtikel);
          setKategoriData(reversedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [searchParams]);
  
    const handleSort = (key: string) => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
  
      const sortedData = [...kategoriData].sort((a, b) => {
        if (a.attributes[key] < b.attributes[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a.attributes[key] > b.attributes[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
  
      setKategoriData(sortedData);
    };
  
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative flex flex-col pt-5 pr-5 pb-20 pl-10 bg-amber-100 rounded-xl max-md:pl-5">
        <div className="flex gap-5 items-start text-4xl font-semibold text-black max-md:flex-wrap max-md:max-w-full">
          <div className="flex-auto self-end mt-11 max-md:mt-10 max-md:max-w-full">
            Tabel Kekayaan Informasi pada Kategori <br />
            {judul}
          </div>
        </div>
        <div className="flex flex-col py-px mt-9 text-xs leading-4 text-white rounded border border-solid bg-neutral-700 border-zinc-600 max-md:max-w-full">
          <div className="overflow-y-auto max-h-148">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">No</th>
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('judul')}>Judul</th>
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('word_count')}>Jumlah Kata</th>
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('char_count')}>Jumlah Karakter</th>
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('bluelinks_count')}>Jumlah Blue-Links</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {kategoriData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {item.attributes.judul}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {item.attributes.word_count}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {item.attributes.char_count}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {item.attributes.bluelinks_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-5 right-5 px-3 py-2 bg-white rounded-md">Close</button>
      </div>
    </div>
    );
  };
  
  export default LeftOverlayBox;