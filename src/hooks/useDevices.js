
import { useQuery } from '@tanstack/react-query';
import { fetchDevices } from '../services/get-devices';

export const useDevices = () => {
  const {
    data: devices,
    isLoading: isLoadingDevices,
    isError: isErrorDevices,
    refetch: getDevices,
  } = useQuery({
    queryKey: ['devices'],
    queryFn: () =>
      fetchDevices(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    getDevices,
    isLoadingDevices,
    isErrorDevices,
    devices
  };
};
