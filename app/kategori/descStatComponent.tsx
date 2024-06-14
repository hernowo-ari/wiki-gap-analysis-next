import React from 'react';

interface DescStatProps {
  data: any; // Use any type for data prop
}

const DescStatisticsBox: React.FC<DescStatProps> = ({ data }) => {

  const formatNumber = (num: number | undefined, decimalPlaces: number = 2) => {
    if (num === undefined) {
      return ''; // Return an empty string if the number is undefined
    }
    return num.toFixed(decimalPlaces);
  };

  // Render the component using the attributes
  return (
    <div className="flex flex-col w-20/20 max-md:ml-0">
    <div className="flex flex-col px-9 py-7 bg-white rounded-xl border border-solid shadow-sm border-neutral-700 text-neutral-700 max-md:px-4">
      <div className="font-bold mx-4 text-3xl max-md:mx-2.5 text-center">Statistik Deskriptif</div>
      <div className="mt-3 text-base max-md:mt-6">
        <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="text-left">Mean Kata</div>
            <div className="text-right">{formatNumber(data.words_mean)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="text-left">Mean Blue-links</div>
            <div className="text-right">{formatNumber(data.bluelinks_mean)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="text-left">Mean Karakter</div>
            <div className="text-right">{formatNumber(data.char_mean)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="text-left">Median Kata</div>
            <div className="text-right">{formatNumber(data.words_median)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="text-left">Median Blue-links</div>
            <div className="text-right">{formatNumber(data.bluelinks_median)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="text-left">Median Karakter</div>
            <div className="text-right">{formatNumber(data.char_median)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="text-left">Deviasi Kata</div>
            <div className="text-right">{formatNumber(data.words_std)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="text-left">Deviasi Blue-links</div>
            <div className="text-right">{formatNumber(data.bluelinks_std)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="text-left">Deviasi Karakter</div>
            <div className="text-right">{formatNumber(data.char_std)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescStatisticsBox;
