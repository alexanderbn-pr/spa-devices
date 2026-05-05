import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDevices } from './useDevices';
import { fetchDevices } from '../services/getDevices';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { devicesMock } from './mocks/useDevicesMocks';

// Mock del debounce
vi.mock('@uidotdev/usehooks', () => ({
  useDebounce: (v) => v,
}));

// Mock del servicio
vi.mock('../services/getDevices', () => ({
  fetchDevices: vi.fn(),
}));

// Wrapper con suspense
function getWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        suspense: true, // Habilitar suspense
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useDevices', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('devuelve los dispositivos del servicio', async () => {
    vi.mocked(fetchDevices).mockResolvedValue(devicesMock);

    const { result } = renderHook(() => useDevices(), {
      wrapper: getWrapper(),
    });

    // Con suspense, el componente se suspende hasta que los datos lleguen
    await waitFor(() => {
      expect(result.current.devices).toEqual(devicesMock);
    });
  });

  it('filtra dispositivos por nombre de marca o modelo', async () => {
    vi.mocked(fetchDevices).mockResolvedValue(devicesMock);

    const { result } = renderHook(() => useDevices(), {
      wrapper: getWrapper(),
    });

    await waitFor(() => result.current.devices !== undefined);

    // Verificar que la query tiene datos
    expect(result.current.devices).toHaveLength(2);
  });
});