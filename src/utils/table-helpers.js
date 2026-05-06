/**
 * Tabla genérica: helper functions puros para filtering, sorting y pagination
 * Sigaend react-table skill patterns
 */

/**
 * Filtra datos por búsqueda en campos específicos
 * @param {T[]} data - datos a filtrar
 * @param {string} search - término de búsqueda
 * @param {(keyof T)[]} searchFields - campos en los que buscar
 * @param {Record<string, any>} [additionalFilters] - filtros adicionales
 * @returns {T[]} datos filtrados
 */
export function filterData(data, search, searchFields, additionalFilters) {
  return data.filter((item) => {
    // Filtrado por búsqueda
    if (search.trim()) {
      const matchesSearch = searchFields.some((field) =>
        String(item[field] ?? '')
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      if (!matchesSearch) return false;
    }

    // Filtros adicionales
    if (additionalFilters) {
      for (const [key, value] of Object.entries(additionalFilters)) {
        if (value === null || value === undefined) continue;
        if (item[key] !== value) return false;
      }
    }

    return true;
  });
}

/**
 * Ordena datos por campo y orden
 * @param {T[]} data - datos a ordenar
 * @param {keyof T} sortBy - campo por el que ordenar
 * @param {'asc' | 'desc'} order - orden asc/desc
 * @param {'string' | 'number' | 'date' | 'boolean' | 'custom'} dataType - tipo de dato del campo
 * @param {Function} [sortFn] - función custom de ordenación
 * @returns {T[]} datos ordenados
 */
export function sortData(data, sortBy, order, dataType, sortFn) {
  return [...data].sort((a, b) => {
    if (sortFn) {
      return order === 'asc' ? sortFn(a, b) : sortFn(b, a);
    }

    const valueA = a[sortBy];
    const valueB = b[sortBy];

    // Manejo de null/undefined
    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return 1;
    if (valueB == null) return -1;

    // Ordenación por tipo
    switch (dataType) {
      case 'number': {
        return order === 'asc'
          ? (Number(valueA) || 0) - (Number(valueB) || 0)
          : (Number(valueB) || 0) - (Number(valueA) || 0);
      }
      case 'date': {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }
      case 'boolean': {
        return order === 'asc'
          ? (valueA ? 1 : 0) - (valueB ? 1 : 0)
          : (valueB ? 1 : 0) - (valueA ? 1 : 0);
      }
      case 'string':
      default: {
        return order === 'asc'
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      }
    }
  });
}

/**
 * Pagina datos
 * @param {T[]} data - datos a paginar
 * @param {number} page - página actual (1-indexed)
 * @param {number} pageSize - items por página
 * @returns {{ items: T[], totalPages: number }} items de la página y total de páginas
 */
export function paginateData(data, page, pageSize) {
  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize;
  const items = data.slice(start, start + pageSize);
  return { items, totalPages };
}