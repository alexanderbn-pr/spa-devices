/**
 * Hook personalizado para estado de tabla genérica
 * Sigue react-table skill patterns
 */

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { filterData, sortData, paginateData } from '../utils/table-helpers';

/**
 * Hook para gestionar estado de tabla con filtering, sorting y pagination
 * @param {import('../types/table').TableConfig<T>} config - configuración de la tabla
 * @returns {Object} estado y acciones de la tabla
 */
export function useTableState(config) {
  const [search, setSearch] = useState('');          // Valor delayado (para filter)
  const [inputValue, setInputValue] = useState(''); // Valor inmediato (para input display)
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const debounceRef = useRef(null);

  // Aplicar debounce a búsqueda
  // inputValue se muestra inmediatamente, search se actualiza después del delay
  const handleSearchChange = useCallback((value) => {
    setInputValue(value); // Immediate update for UI
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    const delay = config.debounceMs ?? 300;
    debounceRef.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, delay);
  }, [config.debounceMs]);

  // Cleanup al unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Set filter específico
  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({});
    setSearch('');
    setInputValue('');
    setPage(1);
  }, []);

  // Toggle ordenación
  const toggleSort = useCallback((key) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
    setPage(1);
  }, [sortBy]);

  // Toggle selección de fila
  const toggleRowSelection = useCallback((index) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  }, []);

  // Datos procesados
  const processedData = useMemo(() => {
    const searchFields = config.searchableFields || config.columns.map((c) => c.key);
    
    // Filtrar
    let filtered = config.searchable
      ? filterData(config.data, search, searchFields, filters)
      : config.data;

    // Ordenar
    if (config.sortable && sortBy) {
      const column = config.columns.find((c) => c.key === sortBy);
      filtered = sortData(
        filtered,
        sortBy,
        sortOrder,
        column?.dataType ?? 'string',
        column?.sortFn
      );
    }

    // Paginar
    const pageSize = config.pageSize ?? 10;
    const { items, totalPages } = config.paginated
      ? paginateData(filtered, page, pageSize)
      : { items: filtered, totalPages: 1 };

    return {
      items,
      totalPages,
      totalFiltered: filtered.length,
    };
  }, [config.data, config.columns, config.searchable, config.sortable, config.paginated, config.pageSize, config.searchableFields, search, filters, sortBy, sortOrder, page]);

  return {
    state: {
      search,
      inputValue,  // Para mostrar en el input inmediatamente
      filters,
      sortBy,
      sortOrder,
      page,
      selectedRows,
    },
    actions: {
      setSearch: handleSearchChange,
      setFilter,
      clearFilters,
      setSortBy: toggleSort,
      setSortOrder,
      setPage,
      toggleRowSelection,
    },
    data: processedData,
  };
}