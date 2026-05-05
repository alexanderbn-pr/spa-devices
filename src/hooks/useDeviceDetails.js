import { useQuery } from '@tanstack/react-query';
import { fetchDeviceDetails } from '../services/getDeviceDetails.js';
import { useEffect, useState, useMemo } from 'react';
import { queryKeys } from '../lib/query-keys.js';
import { EXPIRATION } from '../constants.js';

/**
 * Hook para obtener detalles de un dispositivo específico
 */
export const useDeviceDetails = (id) => {
  const [storageSelected, setStorageSelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');

  const {
    data: deviceDetails,
    isLoading: isLoadingDeviceDetails,
    isError: isErrorDeviceDetails,
    refetch: getDeviceDetails,
  } = useQuery({
    queryKey: queryKeys.devices.detail(id),
    queryFn: () => fetchDeviceDetails(id),
    enabled: !!id,
    staleTime: EXPIRATION,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Memoize para evitar recrear arrays en cada render - estabilidad de referencias
  const storages = useMemo(
    () =>
      deviceDetails?.internalMemory?.map((mem) => ({
        value: mem,
        label: mem,
      })) ?? [],
    [deviceDetails?.internalMemory]
  );

  const colors = useMemo(
    () =>
      deviceDetails?.colors?.map((color) => ({
        value: color,
        label: color,
      })) ?? [],
    [deviceDetails?.colors]
  );

  // Seleccionar primer valor por defecto si no hay selección
  useEffect(() => {
    if (storages.length > 0 && !storageSelected) {
      setStorageSelected(storages[0].value);
    }
  }, [storages, storageSelected]);

  useEffect(() => {
    if (colors.length > 0 && !colorSelected) {
      setColorSelected(colors[0].value);
    }
  }, [colors, colorSelected]);

  return {
    getDeviceDetails,
    isLoadingDeviceDetails,
    isErrorDeviceDetails,
    deviceDetails,
    storages,
    storageSelected,
    setStorageSelected,
    colors,
    colorSelected,
    setColorSelected,
  };
};