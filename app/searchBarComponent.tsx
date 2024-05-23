import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBoxProps {
  defaultLanguage?: string;
  defaultQuery?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ defaultLanguage = 'en', defaultQuery = '' }) => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(defaultQuery);
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>(defaultLanguage);
  const [dots, setDots] = useState<number>(1);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [titlesCount, setTitlesCount] = useState<number>(0);
  const [currentTitleIndex, setCurrentTitleIndex] = useState<number>(0);
  const [includeSubcategories, setIncludeSubcategories] = useState<boolean>(false);
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('row');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFlexDirection(window.innerWidth > 640 ? 'row' : 'column');
      console.log(window.innerWidth);

      const handleResize = () => {
        setFlexDirection(window.innerWidth > 640 ? 'row' : 'column');
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === 3 ? 1 : prevDots + 1));
    }, 500);

    const queryParamKategori = searchParams.get('nama_kategori') || '';
    const queryParamLanguage = searchParams.get('language') || '';

    if (queryParamKategori !== '') {
      setSearchQuery(queryParamKategori);
    }

    if (queryParamLanguage !== '') {
      setLanguage(queryParamLanguage);
    }

    return () => clearInterval(interval);
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchArticle = async (title: string, namaKategori: string, language: string, index: number): Promise<any> => {
    const url = `https://hernowo12345.pythonanywhere.com/artikel/get/?kategori=${encodeURIComponent(namaKategori)}&language=${encodeURIComponent(language)}&title=${encodeURIComponent(title)}`;
    const articleResponse = await axios.get(url);
    setCurrentTitleIndex(index + 1); // Update the current title index
    return articleResponse.data;
  };

  const fetchDataAndRedirect = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://hernowo12345.pythonanywhere.com/kategori/`, {
        params: {
          kategori: encodeURIComponent(searchQuery),
          language: encodeURIComponent(language),
          subcategories_flag: includeSubcategories,
        },
      });
      const data = response.data;

      const firstCategory = data.data.categories[0];
      const pageTitles: string[] = data.data.page_titles;
      const titlesCount = pageTitles.length;

      setTitlesCount(titlesCount);

      const namaKategori = firstCategory.nama_kategori;
      const datetimeString = firstCategory.created_at;
      const date = new Date(datetimeString);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}`;

      const articlePromises = pageTitles.map((title, index) => fetchArticle(title, namaKategori, language, index));

      const articles = await Promise.all(articlePromises);

      router.push(`/kategori/?nama_kategori=${encodeURIComponent(namaKategori)}&language=${language}&datetime=${formattedDatetime}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setCurrentTitleIndex(0);
      setTitlesCount(0);
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`https://${language}.wikipedia.org/w/api.php`, {
        params: {
          action: 'query',
          list: 'search',
          srsearch: query,
          srnamespace: 14,
          srlimit: 5,
          format: 'json',
          origin: '*', // To bypass CORS issues
        },
      });
      const transformedSuggestions = response.data.query.search.map((item: any) => {
        return {
          ...item,
          title: item.title.slice(9),
        };
      });
      setSuggestions(transformedSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setDebounceTimeout(setTimeout(() => {
      if (query.length > 2) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 500)); // 1-second debounce
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.title);
    setSuggestions([]);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchDataAndRedirect();
    }
  };

  const handleLanguageClick = (lang: string) => {
    setLanguage(lang); // Update selected language
  };

  const handleButtonClick = () => {
    fetchDataAndRedirect();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeSubcategories(event.target.checked);
  };

  const renderLoadingText = () => {
    if (titlesCount > 0) {
      return `Loading [${currentTitleIndex}/${titlesCount}]`;
    }
    let loadingText = 'Loading';
    for (let i = 0; i < dots; i++) {
      loadingText += '.';
    }
    return loadingText;
  };

  const handleInputFocus = () => {
    if (searchBoxRef.current) {
      searchBoxRef.current.scrollLeft = searchBoxRef.current.scrollWidth || 0;
    }
  };

  return (
    <div className="flex-auto my-auto text-2xl text-neutral-700 max-md:max-w-full relative" ref={searchBoxRef}>
      <div className="w-full text-base overflow-x-auto" style={{ display: 'flex', alignItems: 'center', flexDirection}}>
        <div style={{ position: 'relative', minWidth: '200px', width: '100%', marginRight: '4px' }}>
          <input
            type="text"
            placeholder={defaultQuery === '' ? 'Cari Kategori' : defaultQuery}
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
            className="pl-24 pr-8 py-2 border border-black rounded-md w-full"
          />
          <div style={{ display: 'flex'}}>
            <button
              onClick={() => handleLanguageClick('en')}
              className={`absolute left-2 top-1.5 px-2 py-1 border border-black rounded-md text-sm hover:bg-${language === 'en' ? 'orange' : 'white'}-300 ${language === 'en' ? 'bg-orange-300' : ''}`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageClick('id')}
              className={`absolute left-12 top-1.5 px-2 py-1 border border-black rounded-md text-sm hover:bg-${language === 'id' ? 'orange' : 'white'}-300 ${language === 'id' ? 'bg-orange-300' : ''}`}
            >
              ID
            </button>
            <button
              onClick={handleButtonClick}
              className="absolute right-2 top-1.5 px-2 py-1 border border-black rounded-md text-sm hover:bg-blue-500 hover:text-white"
            >
              Search
            </button>
          </div>
        </div>
        <label className="px-2 py-2 border border-black rounded-md text-sm" style={{ alignSelf: 'flex-start', minWidth: '200px', minHeight:'40px' }}>
        <input
          type="checkbox"
          checked={includeSubcategories}
          onChange={handleCheckboxChange}
          className="mr-1"
        />
        Include Subcategories
      </label>
      </div>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-center">
          {renderLoadingText()}
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.pageid}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default SearchBox;
