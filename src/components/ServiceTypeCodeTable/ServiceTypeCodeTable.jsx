import { useMemo, useState } from 'react';
import codes from './serviceTypeCodes.json';

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

function SortIcon({ direction }) {
  return (
    <svg
      className={`svcCodeSortIcon${direction ? ' svcCodeSortIconActive' : ''}`}
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {direction === -1 ? (
        <path d='M6 2v8M3 7l3 3 3-3' />
      ) : direction === 1 ? (
        <path d='M6 10V2M3 5l3-3 3 3' />
      ) : (
        <>
          <path d='M3 4.5l3-2.5 3 2.5' opacity='0.4' />
          <path d='M3 7.5l3 2.5 3-2.5' opacity='0.4' />
        </>
      )}
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className='svcCodeSearchIcon'
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <line x1='21' y1='21' x2='16.65' y2='16.65' />
    </svg>
  );
}

export default function ServiceTypeCodeTable() {
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState(1);

  const handleSort = (field) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDir((d) => (d === 1 ? -1 : 1));
        return prev;
      }
      setSortDir(1);
      return field;
    });
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = !q
      ? codes
      : codes.filter(
          (row) =>
            row.code.toLowerCase().includes(q) ||
            row.name.toLowerCase().includes(q) ||
            row.description.toLowerCase().includes(q)
        );

    if (sortField) {
      result = [...result].sort(
        (a, b) => sortDir * collator.compare(a[sortField], b[sortField])
      );
    }

    return result;
  }, [query, sortField, sortDir]);

  return (
    <div className='svcCodeTableWrapper'>
      <div className='svcCodeTableTopBar'>
        <div className='svcCodeSearchWrap'>
          <SearchIcon />
          <input
            type='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search by code, name, or description…'
            className='svcCodeTableSearch'
          />
          {query && (
            <button
              className='svcCodeSearchClear'
              onClick={() => setQuery('')}
              aria-label='Clear search'
            >
              <svg
                width='14'
                height='14'
                viewBox='0 0 14 14'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              >
                <line x1='3' y1='3' x2='11' y2='11' />
                <line x1='11' y1='3' x2='3' y2='11' />
              </svg>
            </button>
          )}
        </div>
        <div className='svcCodeTableCount'>
          <strong>{rows.length.toLocaleString()}</strong> of{' '}
          {codes.length.toLocaleString()} service type codes
        </div>
      </div>

      <div className='svcCodeTableScroll'>
        <table className='svcCodeTable'>
          <thead>
            <tr>
              <th className='svcCodeTableTh svcCodeTableThCode'>
                <button
                  className='svcCodeSortBtn'
                  onClick={() => handleSort('code')}
                >
                  Code{' '}
                  <SortIcon direction={sortField === 'code' ? sortDir : null} />
                </button>
              </th>
              <th className='svcCodeTableTh svcCodeTableThName'>
                <button
                  className='svcCodeSortBtn'
                  onClick={() => handleSort('name')}
                >
                  Name{' '}
                  <SortIcon direction={sortField === 'name' ? sortDir : null} />
                </button>
              </th>
              <th className='svcCodeTableTh svcCodeTableThDescription'>
                Description
              </th>
              <th className='svcCodeTableTh svcCodeTableThDates'>Dates</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr style={{ border: 'none' }}>
                <td colSpan={4} className='svcCodeTableEmpty'>
                  No service type codes match your search.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.code} className='svcCodeTableRow'>
                  <td className='svcCodeTableTdCode'>
                    <code className='svcCodeChip'>{row.code}</code>
                  </td>
                  <td className='svcCodeTableTdName'>{row.name}</td>
                  <td className='svcCodeTableTdDescription'>
                    {row.description ? (
                      row.description
                    ) : (
                      <span className='svcCodeCellEmpty'>—</span>
                    )}
                    {row.technicalNote && (
                      <>
                        <br />
                        <br />
                        <em>Technical Note:</em> {row.technicalNote}
                      </>
                    )}
                  </td>
                  <td className='svcCodeTableTdDates'>
                    {row.dates.map((d, i) => (
                      <span key={d}>
                        {i > 0 && <br />}
                        {d}
                      </span>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
