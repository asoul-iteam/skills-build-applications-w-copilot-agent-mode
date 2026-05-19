import React, { useCallback, useEffect, useMemo, useState } from 'react';

const getValue = (row, accessor) => {
  if (typeof accessor === 'function') {
    return accessor(row);
  }

  const value = row?.[accessor];
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return value;
};

const ResourceTablePage = ({ title, endpoint, columns }) => {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      console.log(`${title} endpoint:`, endpoint);

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} while fetching ${endpoint}`);
      }

      const data = await response.json();
      const normalizedRows = Array.isArray(data) ? data : Array.isArray(data.results) ? data.results : [];

      console.log(`Fetched ${title.toLowerCase()}:`, normalizedRows);
      setRows(normalizedRows);
    } catch (fetchError) {
      console.error(`Error fetching ${title.toLowerCase()}:`, fetchError);
      setError(fetchError.message);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, title]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredRows = useMemo(() => {
    if (!query.trim()) {
      return rows;
    }

    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(normalizedQuery));
  }, [rows, query]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
          <div>
            <h2 className="h3 fw-bold mb-1 text-primary-emphasis">{title}</h2>
            <a className="link-primary fw-semibold" href={endpoint} target="_blank" rel="noreferrer">
              Open API endpoint
            </a>
          </div>
          <button type="button" className="btn btn-primary" onClick={fetchData}>
            Refresh Data
          </button>
        </div>

        <form className="row g-3 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-7">
            <label htmlFor={`${title}-search`} className="form-label fw-semibold">
              Search {title}
            </label>
            <input
              id={`${title}-search`}
              type="text"
              className="form-control"
              placeholder={`Filter ${title.toLowerCase()} records`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </form>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                {columns.map((column) => (
                  <th key={column.header} scope="col">
                    {column.header}
                  </th>
                ))}
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && filteredRows.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-4 text-muted">
                    No data found.
                  </td>
                </tr>
              )}
              {filteredRows.map((row, index) => (
                <tr key={row.id || index}>
                  {columns.map((column) => (
                    <td key={`${row.id || index}-${column.header}`}>{getValue(row, column.accessor)}</td>
                  ))}
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setSelectedRow(row)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {loading && (
        <div className="card-footer bg-light border-0">
          <small className="text-muted">Loading data...</small>
        </div>
      )}

      {selectedRow && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title} Details</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedRow(null)} aria-label="Close" />
                </div>
                <div className="modal-body">
                  <pre className="mb-0 small">{JSON.stringify(selectedRow, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedRow(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" onClick={() => setSelectedRow(null)} />
        </>
      )}
    </section>
  );
};

export default ResourceTablePage;
