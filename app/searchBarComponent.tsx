import React, { useState, useEffect, useRef  } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

interface SearchBoxProps {
    defaultLanguage?: string;
    defaultQuery?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ defaultLanguage = 'en', defaultQuery = '' }) => {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string>(defaultQuery);
    const [loading, setLoading] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>(defaultLanguage);
    const router = useRouter();
    const [dots, setDots] = useState<number>(1);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const searchBoxRef = useRef<HTMLDivElement>(null);

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
    }, []);

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

    const fetchDataAndRedirect = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://hernowo12345.pythonanywhere.com/kategori/?nama_kategori=${encodeURIComponent(searchQuery)}&language=${encodeURIComponent(language)}`);
            const data = response.data;
            console.log(data)
            const firstItem = data.data[0];
            const attributes = firstItem.attributes;
            const namaKategori = attributes.nama_kategori;

            const queryParam = encodeURIComponent(namaKategori);
            const queryParam2 = language === 'en' ? 'en' : 'id';

            const datetimeString = attributes.created_at;
            const date = new Date(datetimeString);

            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}`;

            router.push(`/kategori/?nama_kategori=${queryParam}&language=${queryParam2}&datetime=${formattedDatetime}`);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
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
        }, 1000)); // 1-second debounce
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

    const renderLoadingText = () => {
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
          <div className="w-full px-4 text-base overflow-x-auto">
            <input
              type="text"
              placeholder={defaultQuery === '' ? 'Cari Kategori' : defaultQuery}
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
              onFocus={handleInputFocus}
              className="pl-24 pr-8 py-2 border border-black rounded-md w-full"
            />
            <button
              onClick={() => handleLanguageClick('en')}
              className={`absolute left-6 top-1.5 px-2 py-1 border border-black rounded-md text-sm hover:bg-${language === 'en' ? 'orange' : 'white'}-300 ${language === 'en' ? 'bg-orange-300' : ''}`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageClick('id')}
              className={`absolute left-16 top-1.5 px-2 py-1 border border-black rounded-md text-sm hover:bg-${language === 'id' ? 'orange' : 'white'}-300 ${language === 'id' ? 'bg-orange-300' : ''}`}
            >
              ID
            </button>
            <button
              onClick={handleButtonClick}
              className="absolute right-6 top-1.5 px-2 py-1 border border-black rounded-md text-sm hover:bg-blue-500 hover:text-white"
            >
              Search
            </button>
          </div>
          {loading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-center">
              {renderLoadingText()}
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
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
