import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchDevices } from '../services/getDevices';
import { queryKeys } from '../lib/query-keys';
import { EXPIRATION } from '../constants';

/**
 * Hook para obtener dispositivos
 * Usa useSuspenseQuery - se suspende hasta que cargan los datos
 * Recibe el search filtrado (ya debounced) por parámetro
 * 
 * @param {string} debouncedSearch - search filtrado y debounced
 * @returns {{ devices: array }}
 */
export const useDevices = (debouncedSearch = '') => {
  const { data: allDevices } = useSuspenseQuery({
    queryKey: queryKeys.devices.list({ search: debouncedSearch }),
    queryFn: () => fetchDevices(),
    staleTime: EXPIRATION,
    gcTime: EXPIRATION,
  });

  // Filtrar local
  const devices = useMemo(() => {
    if (!debouncedSearch || debouncedSearch.length === 0) {
      return allDevices;
    }
    return allDevices.filter((device) =>
      device.brand.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      device.model.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [allDevices, debouncedSearch]);

  return { devices };
};