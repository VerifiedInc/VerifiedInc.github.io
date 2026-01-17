import React, { useMemo, useState } from "react";

function normalize(str) {
  return String(str ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .trim();
}

/**
 * "Fuzzy-ish" match:
 * - Split query into words
 * - Every word must appear somewhere in the row text (any order)
 */
function matchesQuery(rowText, query) {
  const q = normalize(query);
  if (!q) return true;

  const words = q.split(/\s+/).filter(Boolean);
  const text = normalize(rowText);

  return words.every((w) => text.includes(w));
}

export default function SearchableTable({
  rows,
  columns,
  placeholder = "Search…",
  className,
  stickyHeader = true,
}) {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    if (!query.trim()) return rows;

    return rows.filter((row) => {
      // Concatenate searchable text across columns
      const rowText = columns
        .map((col) => (col.searchValue ? col.searchValue(row) : row[col.key]))
        .join(" ");

      return matchesQuery(rowText, query);
    });
  }, [query, rows, columns]);

  return (
    <div className={className}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          marginBottom: 12,
          borderRadius: 8,
          border: "1px solid var(--ifm-color-emphasis-300)",
          background: "var(--ifm-background-surface-color)",
          color: "var(--ifm-font-color-base)",
        }}
      />

      <div style={{ overflow: "auto", maxHeight: "calc(100vh - 300px)" }}>
        <table className={`table searchableTable ${stickyHeader ? "stickyHeader" : ""}`}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>
                    {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredRows.map((row, idx) => (
              <tr key={row.id ?? idx}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={col.wrap ? "wrapCell" : undefined}
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
        Showing {filteredRows.length} of {rows.length}
      </div>
    </div>
  );
}
