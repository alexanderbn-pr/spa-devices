import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAddDeviceCart } from '../services/postAddDeviceCart';
import { useCartContext } from './useCartContext';
import { queryKeys } from '../lib/query-keys';

/**
 * Hook para añadir dispositivo al carrito
 * Implementa optimistic update y caché invalidation
 */
export const useCart = () => {
  const { cartItemsCount, setCartItemsCount } = useCartContext();
  const queryClient = useQueryClient();

  const { 
    mutate: addToCart,
    isLoading: isLoadingAddingCart,
    isError: isErrorAddingCart,
  } = useMutation({
    mutationFn: fetchAddDeviceCart,
    // Optimistic update: actualizar UI inmediatamente
    onMutate: async (newItem) => {
      // Cancelar refetches pendientes
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.count() });
      
      // Snapshot del contexto anterior
      const previousCount = cartItemsCount;
      
      // Actualizar optimísticamente
      setCartItemsCount((prev) => prev + 1);
      
      return { previousCount };
    },
    // Rollback si hay error
    onError: (err, variables, context) => {
      if (context?.previousCount !== undefined) {
        setCartItemsCount(context.previousCount);
      }
    },
    // Invalidar caché al final
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.count() });
    },
  });

  return {
    cartItemsCount,
    addToCart,
    isLoadingAddingCart,
    isErrorAddingCart,
  };
};