import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAddDeviceCart } from '../services/postAddDeviceCart';
import { useCartContext } from './useCartContext';
import { queryKeys } from '../lib/query-keys';
import { useToast } from './useToast';
import { useTranslation } from 'react-i18next';

/**
 * Hook para añadir dispositivo al carrito
 * Implementa optimistic update y caché invalidation
 */
export const useCart = () => {
  const { cartItemsCount, setCartItemsCount } = useCartContext();
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: addToCart,
    isLoading: isLoadingAddingCart,
    isError: isErrorAddingCart,
  } = useMutation({
    mutationFn: fetchAddDeviceCart,
    // Optimistic update: actualizar UI inmediatamente
    onMutate: async () => {
      // Cancelar refetches pendientes
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.count() });

      // Snapshot del contexto anterior
      const previousCount = cartItemsCount;

      // Actualizar optimísticamente
      setCartItemsCount((prev) => prev + 1);

      return { previousCount };
    },
    // Mostrar toast de éxito
    onSuccess: () => {
      toast.success(t('cart.added'));
    },
    // Rollback si hay error y mostrar toast de error
    onError: (err, variables, context) => {
      if (context?.previousCount !== undefined) {
        setCartItemsCount(context.previousCount);
      }
      toast.error(t('cart.error'));
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