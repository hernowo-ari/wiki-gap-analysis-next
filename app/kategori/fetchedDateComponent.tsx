import React from 'react'
import { useSearchParams } from 'next/navigation';

function FetchedDateComponent() {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('datetime') || '';

  return (
    <div className="self-end mt-4 text-2xl text-neutral-700 max-md:mt-10 max-md:max-w-full">
      Data diambil pada {queryParam} GMT+7
  </div>
  )
}

export default FetchedDateComponent
