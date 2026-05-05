import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

/**
 * Hook para el estado de búsqueda
 * Maneja el estado + debounce - se usa fuera de Suspense
 * 
 * @returns {{
 *   searchName: string,
 *   setSearchName: function,
 *   debouncedFilterName: string
 * }}
 */
export const useDevicesSearch = () => {
  const [searchName, setSearchName] = useState('');  
  const debouncedFilterName = useDebounce(searchName, 250);

  return { 
    searchName, 
    setSearchName,
    debouncedFilterName 
  };
};