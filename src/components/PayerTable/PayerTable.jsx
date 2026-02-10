import { useState, useCallback, useEffect, useRef } from 'react';

const API_URL = 'http://localhost:3010/payers';
const PAGE_SIZE = 50;
const DEBOUNCE_MS = 300;

function buildUrl({ limit, skip, search }) {
  let url = `${API_URL}?$limit=${limit}&$skip=${skip}`;
  if (search) url += `&$search=${encodeURIComponent(search)}`;
  return url;
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

function PayerInitials({ name }) {
  const initials = (name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  return <div className='payerLogoPlaceholder'>{initials}</div>;
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

  const debounceRef = useRef(null);
  const scrollRef = useRef(null);
  const sentinelRef = useRef(null);
  const loadingMoreRef = useRef(false);

  const handleQueryChange = useCallback((value) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, DEBOUNCE_MS);
  }, []);

  // Fetch first page whenever search query changes (or on initial load)
  useEffect(() => {
    const controller = new AbortController();
    const search = debouncedQuery.trim();

    setLoading(true);
    setError(null);
    setPayers([]);

    fetch(buildUrl({ limit: PAGE_SIZE, skip: 0, search }), {
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
  }, [debouncedQuery]);

  const loadMoreFn = useRef(null);
  loadMoreFn.current = () => {
    if (loadingMoreRef.current || payers.length >= total) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);

    const search = debouncedQuery.trim();
    fetch(buildUrl({ limit: PAGE_SIZE, skip: payers.length, search }))
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
            placeholder='Search by name…'
            className='payerTableSearch'
          />
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
              <th className='payerTableTh payerTableThName'>Name &amp; ID</th>
              <th className='payerTableTh payerTableThId'>Verified ID</th>
              <th className='payerTableTh payerTableThIds'>Other IDs</th>
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
                    <div className='payerSkeleton payerSkeletonSmall' />
                  </td>
                  <td>
                    <div className='payerSkeleton payerSkeletonWide' />
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={3} className='payerTableEmpty payerTableError'>
                  Failed to load payers: {error}
                </td>
              </tr>
            ) : payers.length === 0 ? (
              <tr>
                <td colSpan={3} className='payerTableEmpty'>
                  No payers match your search.
                </td>
              </tr>
            ) : (
              payers.map((row, idx) => (
                <tr key={row.verifiedId ?? idx} className='payerTableRow'>
                  <td className='payerTableTdName'>
                    <div className='payerNameCell'>
                      {row.logoUrl ? (
                        <img
                          src={row.logoUrl}
                          alt=''
                          className='payerLogo'
                          loading='lazy'
                        />
                      ) : (
                        <PayerInitials name={row.name} />
                      )}
                      <div>
                        <span>{row.name}</span>
                        <br />
                        <span className='caption'>{row.verifiedId}</span>
                      </div>
                    </div>
                  </td>
                  <td className='payerTableTdId'>
                    <code>{row.verifiedId}</code>
                  </td>
                  <td className='payerTableTdIds'>
                    <div className='payerIdChips'>
                      {(Array.isArray(row.ids) ? row.ids : []).map((id) => (
                        <span key={id} className='payerIdChip'>
                          {id}
                        </span>
                      ))}
                    </div>
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
    </div>
  );
}
