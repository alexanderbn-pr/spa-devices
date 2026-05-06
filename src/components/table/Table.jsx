/**
 * Tabla genérica reusable con sorting, filtering y pagination
 * Sigue react-table skill patterns
 */

import { useTableState } from '../../hooks/useTableState';
import './Table.scss';

/**
 * Componente de tabla genérica
 * @param {Object} props
 * @param {import('../../types/table').TableConfig<T>} props.config - configuración de tabla
 * @returns {JSX.Element}
 */
export function Table({ config }) {
  const { state, actions, data } = useTableState(config);

  return (
    <div className="table-wrapper">
      {/* Controles superiores */}
      <div className="table-controls">
        {config.searchable && (
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Buscar..."
              value={state.inputValue}
              onChange={(e) => actions.setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        )}
      </div>

      {/* Tabla */}
      <div className="table-container">
        <table className={`generic-table ${config.striped ? 'striped' : ''} ${config.hover ? 'hover' : ''} ${config.rowClickable ? 'row-clickable' : ''}`}>
          <thead>
            <tr>
              {config.columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => col.sortable && actions.setSortBy(col.key)}
                  className={`${col.sortable ? 'sortable' : ''} ${col.className || ''}`}
                  style={{ width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}
                >
                  <span className="header-content">
                    {col.label}
                    {state.sortBy === col.key && (
                      <span className={`sort-icon ${state.sortOrder}`}>
                        {state.sortOrder === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.items.length > 0 ? (
              data.items.map((row, index) => (
                <tr 
                  key={index}
                  onClick={() => config.rowClickable && config.onRowClick?.(row)}
                  className={config.rowClickable ? 'clickable-row' : ''}
                >
                  {config.columns.map((col) => (
                    <td key={String(col.key)} className={col.className || ''}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={config.columns.length} className="no-data">
                  ⊘ No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {config.paginated && data.totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={state.page === 1}
            onClick={() => actions.setPage(state.page - 1)}
          >
            ← Anterior
          </button>
          <span className="page-info">
            Página {state.page} de {data.totalPages} ({data.totalFiltered} resultados)
          </span>
          <button
            className="pagination-btn"
            disabled={state.page === data.totalPages}
            onClick={() => actions.setPage(state.page + 1)}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;