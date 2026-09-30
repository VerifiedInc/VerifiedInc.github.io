import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import PayerDrawer from './PayerDrawer';

const API_URL = 'https://core-api.verified.inc/v2/1-click/health/payers';
const PAGE_SIZE = 50;
const DEBOUNCE_MS = 300;
const OTHER_NAMES_PREVIEW = 3;

function buildUrl({ limit, skip, search, sortField, sortDir }) {
  let url = `${API_URL}?$limit=${limit}&$skip=${skip}&$paginate=true`;
  if (search) url += `&$search=${encodeURIComponent(search)}`;
  if (sortField) url += `&$sort[${sortField}]=${sortDir}`;
  return url;
}

function SortIcon({ direction }) {
  return (
    <svg
      className={`payerSortIcon${direction ? ' payerSortIconActive' : ''}`}
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
      className='payerSearchIcon'
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

const ELIGIBILITY_LABELS = {
  SUPPORTED: 'Supported',
  ENROLLMENT_REQUIRED: 'Enrollment required',
  NOT_SUPPORTED: 'Not supported',
};

function OperatingStates({ states }) {
  if (!Array.isArray(states) || states.length === 0) {
    return <span className='payerCellEmpty'>—</span>;
  }

  const labels = states.includes('NATIONAL') ? ['National'] : states;

  return (
    <div className='payerChips'>
      {labels.map((label) => (
        <code key={label} className='payerIdChip'>
          {label}
        </code>
      ))}
    </div>
  );
}

function EligibilityBadge({ support }) {
  const label = ELIGIBILITY_LABELS[support];

  if (!label) {
    return <span className='payerCellEmpty'>—</span>;
  }

  return (
    <div className='payerChips'>
      <code className='payerIdChip'>{label}</code>
    </div>
  );
}

function OtherNames({ names }) {
  if (!Array.isArray(names) || names.length === 0) {
    return <span className='payerCellEmpty'>—</span>;
  }

  const hidden = names.length - OTHER_NAMES_PREVIEW;

  return (
    <div className='payerChips'>
      {names.slice(0, OTHER_NAMES_PREVIEW).map((name) => (
        <code key={name} className='payerIdChip payerNameChip'>
          {name}
        </code>
      ))}
      {hidden > 0 && (
        <span className='payerIdChip payerNameChipMore'>+{hidden} more</span>
      )}
    </div>
  );
}

function PayerInitials({ name }) {
  const initials = (name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  return <div className='payerLogoPlaceholder'>{initials}</div>;
}

function PayerLogo({ payer }) {
  return payer.logoUrl ? (
    <img src={payer.logoUrl} alt='' className='payerLogo' loading='lazy' />
  ) : (
    <PayerInitials name={payer.name} />
  );
}

function PayerIds({ ids }) {
  return (
    <div className='payerIdChips'>
      {(Array.isArray(ids) ? ids : []).map((id) => (
        <code key={id} className='payerIdChip'>
          {id}
        </code>
      ))}
    </div>
  );
}

function PayerDetails({ payer }) {
  const otherNames = Array.isArray(payer.otherNames) ? payer.otherNames : [];

  return (
    <>
      <div className='payerNameCell payerDrawerHeader'>
        <PayerLogo payer={payer} />
        <div>
          <h3 className='payerDrawerTitle'>{payer.name}</h3>
          <code className='payerIdChip'>{payer.verifiedId}</code>
        </div>
      </div>
      <dl className='payerDrawerFields'>
        <dt>IDs (green indicates primary)</dt>
        <dd>
          {Array.isArray(payer.ids) && payer.ids.length > 0 ? (
            <PayerIds ids={payer.ids} />
          ) : (
            <span className='payerCellEmpty'>—</span>
          )}
        </dd>
        <dt>States</dt>
        <dd>
          <OperatingStates states={payer.operatingStates} />
        </dd>
        <dt>Eligibility check</dt>
        <dd>
          <EligibilityBadge support={payer.eligibilitySupport} />
        </dd>
        <dt>Other names</dt>
        <dd>
          {otherNames.length > 0 ? (
            <ul className='payerOtherNames payerDrawerNames'>
              {otherNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          ) : (
            <span className='payerCellEmpty'>—</span>
          )}
        </dd>
      </dl>
    </>
  );
}

function LoadingSpinner() {
  return <span className='payerSpinner' />;
}

export default function PayerTable() {
  const [payers, setPayers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState(1);

  const debounceRef = useRef(null);
  const scrollRef = useRef(null);
  const sentinelRef = useRef(null);
  const loadingMoreRef = useRef(false);

  const [selectedPayer, setSelectedPayer] = useState(null);

  // Stable, so the drawer's open/close effect runs once per open.
  const closeDrawer = useCallback(() => setSelectedPayer(null), []);

  const handleRowClick = useCallback((row) => {
    // Clicking an ID chip selects its text for copying; don't open the drawer over that.
    if (window.getSelection()?.toString()) return;
    setSelectedPayer(row);
  }, []);

  const handleRowKeyDown = useCallback((event, row) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedPayer(row);
    }
  }, []);

  const handleQueryChange = useCallback((value) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, DEBOUNCE_MS);
  }, []);

  const handleSort = useCallback((field) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDir((d) => (d === 1 ? -1 : 1));
        return prev;
      }
      setSortDir(1);
      return field;
    });
  }, []);

  // Fetch first page whenever search query changes (or on initial load)
  useEffect(() => {
    const controller = new AbortController();
    const search = debouncedQuery.trim();

    setLoading(true);
    setError(null);
    setPayers([]);
    setTotal(0);

    fetch(buildUrl({ limit: PAGE_SIZE, skip: 0, search, sortField, sortDir }), {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((res) => {
        setPayers(res.data);
        setTotal(res.total);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, sortField, sortDir]);

  const loadMoreFn = useRef(null);
  loadMoreFn.current = () => {
    if (loadingMoreRef.current || payers.length >= total) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);

    const search = debouncedQuery.trim();
    fetch(
      buildUrl({
        limit: PAGE_SIZE,
        skip: payers.length,
        search,
        sortField,
        sortDir,
      })
    )
      .then((r) => r.json())
      .then((res) => {
        setPayers((prev) => [...prev, ...res.data]);
        setTotal(res.total);
      })
      .catch(() => {})
      .finally(() => {
        setLoadingMore(false);
        loadingMoreRef.current = false;
      });
  };

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const scrollContainer = scrollRef.current;
    if (!sentinel || !scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreFn.current?.();
      },
      { root: scrollContainer, threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const hasMore = payers.length < total;

  return (
    <div className='payerTableWrapper'>
      {/* Header bar */}
      <div className='payerTableTopBar'>
        <div className='payerSearchWrap'>
          <SearchIcon />
          <input
            type='search'
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder='Search by name or ID…'
            className='payerTableSearch'
          />
          {query && (
            <button
              className='payerSearchClear'
              onClick={() => handleQueryChange('')}
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
        <div className='payerTableCount'>
          {loading ? (
            <>
              <LoadingSpinner /> Loading…
            </>
          ) : (
            <>
              <strong>{total.toLocaleString()}</strong> total payers
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className='payerTableScroll' ref={scrollRef}>
        <table className='payerTable'>
          <thead>
            <tr>
              <th className='payerTableTh payerTableThName'>
                <button
                  className='payerSortBtn'
                  onClick={() => handleSort('name')}
                >
                  Logo, Name, Verified ID{' '}
                  <SortIcon direction={sortField === 'name' ? sortDir : null} />
                </button>
              </th>
              <th className='payerTableTh payerTableThStates'>States</th>
              <th className='payerTableTh payerTableThEligibility'>
                Eligibility Check
              </th>
              <th className='payerTableTh payerTableThIds'>
                IDs (green indicates primary)
              </th>
              <th className='payerTableTh payerTableThOtherNames'>
                Other names
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={`skel-${i}`} className='payerTableRow'>
                  <td className='payerTableTdName'>
                    <div className='payerNameCell'>
                      <div className='payerSkeleton payerSkeletonLogo' />
                      <div className='payerSkeleton payerSkeletonText' />
                    </div>
                  </td>
                  <td>
                    <div className='payerSkeleton payerSkeletonWide' />
                  </td>
                  <td>
                    <div className='payerSkeleton payerSkeletonWide' />
                  </td>
                  <td>
                    <div className='payerSkeleton payerSkeletonWide' />
                  </td>
                  <td>
                    <div className='payerSkeleton payerSkeletonWide' />
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr style={{ border: 'none' }}>
                <td colSpan={5} className='payerTableEmpty payerTableError'>
                  Failed to load payers: {error}
                </td>
              </tr>
            ) : payers.length === 0 ? (
              <tr style={{ border: 'none' }}>
                <td colSpan={5} className='payerTableEmpty'>
                  No payers match your search.
                </td>
              </tr>
            ) : (
              payers.map((row, idx) => (
                <tr
                  key={row.verifiedId ?? idx}
                  className='payerTableRow payerTableRowClickable'
                  tabIndex={0}
                  aria-label={`View details for ${row.name}`}
                  onClick={() => handleRowClick(row)}
                  onKeyDown={(event) => handleRowKeyDown(event, row)}
                >
                  <td className='payerTableTdName'>
                    <div className='payerNameCell'>
                      <PayerLogo payer={row} />
                      <div>
                        <span>{row.name}</span>
                        <br />
                        <code className='payerIdChip'>{row.verifiedId}</code>
                      </div>
                    </div>
                  </td>
                  <td className='payerTableTdStates'>
                    <OperatingStates states={row.operatingStates} />
                  </td>
                  <td className='payerTableTdEligibility'>
                    <EligibilityBadge support={row.eligibilitySupport} />
                  </td>
                  <td className='payerTableTdIds'>
                    <PayerIds ids={row.ids} />
                  </td>
                  <td className='payerTableTdOtherNames'>
                    <OtherNames names={row.otherNames} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Sentinel */}
        <div ref={sentinelRef} className='payerTableSentinel'>
          {loadingMore && (
            <>
              <LoadingSpinner /> Loading more…
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      {!loading && payers.length > 0 && (
        <div className='payerTableFooter'>
          Showing {payers.length.toLocaleString()} of {total.toLocaleString()}{' '}
          payers
          {hasMore && ' — scroll for more'}
        </div>
      )}

      <AnimatePresence>
        {selectedPayer && (
          <PayerDrawer title='Payer Details' onClose={closeDrawer}>
            <PayerDetails payer={selectedPayer} />
          </PayerDrawer>
        )}
      </AnimatePresence>
    </div>
  );
}
