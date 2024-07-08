import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

interface FetchedDateComponentProps {
  createdAt: string;
  subcategories: boolean;
}

const FetchedDateComponent: React.FC<FetchedDateComponentProps> = ({ createdAt, subcategories }) => {
  const [formattedDatetime, setFormattedDatetime] = useState('');
  const [statusSub, setStatusSub] = useState('');

  useEffect(() => {
    // Format createdAt timestamp
    const timestamp = new Date(createdAt);
    const year = timestamp.getFullYear();
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
    const day = timestamp.getDate().toString().padStart(2, '0');
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}`;
    
    setFormattedDatetime(formattedDatetime);

    // Determine subcategory status
    const label = subcategories ? 'dengan sub-kategori' : 'tanpa sub-kategori';
    setStatusSub(label);
  }, [createdAt, subcategories]);

  return (
    <div className="self-end mt-4 mb-8 text-2xl text-neutral-700 max-md:mt-10 max-md:max-w-full">
      Data diambil pada {formattedDatetime} GMT+7 ({statusSub})
    </div>
  );
};

export default FetchedDateComponent;
