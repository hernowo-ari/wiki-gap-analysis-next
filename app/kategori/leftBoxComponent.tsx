import { useEffect, useState } from 'react';

interface LeftTableProps {
  data: any[]; // Define the type of kategoriData
  onOpenOverlay: () => void;
}

const LeftTable: React.FC<LeftTableProps> = ({ data, onOpenOverlay }) => {
  // Provide an initial type for kategoriData
  const [kategoriData, setKategoriData] = useState<any[]>([]);

  // Move the logic to useEffect to avoid direct state updates
  useEffect(() => {
    // Ensure data is not empty before proceeding
    if (data.length > 0) {
      // Reverse the data and update the state
      const reversedData = data.slice().reverse();
      setKategoriData(reversedData);
    }
  }, [data]);

  return (
    <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow pl-10 pr-10 pt-6 pb-4 w-full text-sm bg-white rounded-xl border border-solid border-neutral-700 text-neutral-700 max-md:px-4 max-md:mt-6">
        <div className="mb-4 text-3xl font-bold text-center">
          Kekayaan Artikel
        </div>
        {kategoriData.slice(0, 6).map((item: any, index: number) => (
          <div className="m-1" key={index}>
            <div className="font-bold mt-3 text-base max-md:mt-2 break-words max-w-xs">{item.attributes.judul}</div>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>Jumlah Kata</div>
              <div>{item.attributes.word_count}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>Jumlah Blue-links</div>
              <div>{item.attributes.bluelinks_count}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>Jumlah Karakter</div>
              <div>{item.attributes.char_count}</div>
            </div>
          </div>
        ))}
        <button onClick={onOpenOverlay} className="my-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
          Tampilkan Lebih
        </button>
      </div>
    </div>
  );
};

export default LeftTable;


