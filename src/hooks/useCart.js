import { useMutation } from '@tanstack/react-query';
import { fetchAddDeviceCart } from '../services/post-addDeviceCart';
import { useCartContext } from './useCartContext';

export const useCart = () => {
  const { cartItemsCount, setCartItemsCount } = useCartContext();

  const {
    mutate: addToCart,
    isLoading: isLoadingAddingCart,
    isError: isErrorAddingCart,
  } = useMutation({
    mutationFn: fetchAddDeviceCart,
    onSuccess: (count) => {
      setCartItemsCount((prev) => {
        const newCount = prev + count;
        localStorage.setItem('cartItemsCount', newCount);
        return newCount;
      });
    },
  });

  return {
    cartItemsCount,
    addToCart,
    isLoadingAddingCart,
    isErrorAddingCart,
  };
};
