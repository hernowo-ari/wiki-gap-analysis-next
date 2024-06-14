import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface Category {
  language: 'en' | 'id';
  nama_kategori: string;
  subcategories: boolean;
}

interface CategorySuggestionBoxProps {
  categories: Category[];
}

const CategorySuggestionBox: React.FC<CategorySuggestionBoxProps> = ({ categories }) => {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'id'>('en');

  const handleCategoryClick = (nama_kategori: string, subcategories: boolean) => {
    router.push(`/kategori?kategori=${encodeURIComponent(nama_kategori)}&language=${currentLanguage}&subcategories=${subcategories}`);
  };

  const handleLanguageChange = (lang: 'en' | 'id') => {
    setCurrentLanguage(lang);
  };

  const filteredCategories = categories.filter(category => category.language === currentLanguage);

  return (
    <div className="flex flex-col items-start w-full bg-white rounded-md shadow-lg p-4" style={{minWidth: '400px'}}>
      <h2 className="text-black text-lg font-bold mb-4">Saran Kategori</h2>
      <div className="flex items-center w-full">
        <div className="flex">
          <button
            className={`text-sm font-bold ${currentLanguage === 'en' ? 'text-black' : 'text-gray-500'} rounded-tr-[15px] focus:border-black focus:outline-none py-1 px-2 ${currentLanguage === 'en' ? 'border-t-2 border-r-2 border-l-2 border-black' : 'border-b-2 border-black'}`}
            style={{minWidth: '150px'}}
            onClick={() => handleLanguageChange('en')}
          >
            Kategori Inggris
          </button>
          <button
            className={`text-sm font-bold ${currentLanguage === 'id' ? 'text-black' : 'text-gray-500'} rounded-tr-[15px] focus:border-black focus:outline-none py-1 px-2 ${currentLanguage === 'id' ? 'border-t-2 border-r-2 border-l-2 border-black' : 'border-b-2 border-black'}`}
            style={{minWidth: '150px'}}
            onClick={() => handleLanguageChange('id')}
          >
            Kategori Indonesia
          </button>
        </div>
        <div className="border-b-2 border-black w-full mt-7"></div>
      </div>
      <div className='border-l-2 border-b-2 border-r-2 border-black w-full pt-8'>
        <div className="flex flex-wrap px-4">
          {filteredCategories.map((category, index) => (
            <button
              key={index}
              className={`bg-gray-100 hover:bg-gray-200 text-black text-sm mr-2 mb-2 py-1 px-2 rounded-md break-words inline-block ${currentLanguage === 'en' ? 'border border-black focus:border-black focus:outline-none' : 'border border-black focus:border-black focus:outline-none'}`}
              onClick={() => handleCategoryClick(category.nama_kategori, category.subcategories)}
            >
              {category.nama_kategori}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default CategorySuggestionBox;
