import { useQuery } from '@tanstack/react-query';
import { fetchDeviceDetails } from '../services/get-deviceDetails';

export const useDeviceDetails = (id) => {
  const {
    data: deviceDetails,
    isLoading: isLoadingDeviceDetails,
    isError: isErrorDeviceDetails,
    refetch: getDeviceDetails,
  } = useQuery({
    queryKey: ['deviceDetail', id],
    queryFn: () => fetchDeviceDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    getDeviceDetails,
    isLoadingDeviceDetails,
    isErrorDeviceDetails,
    deviceDetails,
  };
};
