'use client';

import React, { useState, useMemo } from 'react';
import { SearchBar } from '../common/SearchBar';
import { Pagination } from '../common/Pagination';
import { Loader } from '../common/Loader';

export const DataTable = ({
  columns,
  data = [],
  loading = false,
  searchKey = 'name',
  searchPlaceholder = 'Search records...',
  headerActions,
  pageSize = 10,
  emptyMessage = 'No records found.',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data by search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lower = searchTerm.toLowerCase();
    return data.filter((row) => {
      if (searchKey && row[searchKey]) {
        return String(row[searchKey]).toLowerCase().includes(lower);
      }
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(lower)
      );
    });
  }, [data, searchTerm, searchKey]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="rounded-2xl bg-navy-900 border border-slate-800 shadow-card overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <SearchBar
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            setCurrentPage(1);
          }}
          placeholder={searchPlaceholder}
          className="w-full sm:w-72"
        />
        {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto min-h-[300px] relative">
        {loading ? (
          <div className="py-20">
            <Loader message="Fetching data..." />
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-sm">{emptyMessage}</div>
        ) : (
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-navy-950/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`py-3.5 px-4 font-semibold ${col.className || ''}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedData.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`py-3.5 px-4 text-slate-300 ${col.className || ''}`}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {!loading && filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default DataTable;
