import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "./EmployeeList.module.scss";

/**
 * @component EmployeeList
 * @description Page listant tous les employés.
 * Propose une recherche globale, un tri par colonne et une pagination.
 * @returns {JSX.Element}
 */
function EmployeeList() {
  const employees = useSelector((state) => state.employees.list);
  const [globalFilter, setGlobalFilter] = useState("");

  /**
   * Définition des colonnes du tableau
   * @type {import('@tanstack/react-table').ColumnDef[]}
   */
  const columns = useMemo(
    () => [
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      { accessorKey: "department", header: "Department" },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      { accessorKey: "street", header: "Street" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "state", header: "State" },
      { accessorKey: "zipCode", header: "Zip Code" },
    ],
    [],
  );

  const table = useReactTable({
    data: employees,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Current Employees</h1>

      {/* Barre de recherche */}
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search employees..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <span className={styles.count}>
          {table.getFilteredRowModel().rows.length} employee(s)
        </span>
      </div>

      {/* Tableau */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={styles.th}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted() === "asc" && " ↑"}
                    {header.column.getIsSorted() === "desc" && " ↓"}
                    {!header.column.getIsSorted() && " ↕"}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.empty}>
                  No employees found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={styles.tr}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.td}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>

        <span>
          Page <b>{table.getState().pagination.pageIndex + 1}</b> /{" "}
          {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              Show {n}
            </option>
          ))}
        </select>
      </div>
    </main>
  );
}

export default EmployeeList;
