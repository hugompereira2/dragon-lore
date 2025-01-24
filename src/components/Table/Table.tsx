'use client';

import React, { useState } from "react";
import "./style.scss";

type Column<T> = {
  field: keyof T;
  headerName: string;
  width?: number;
  flex?: number;
  renderCell?: (row: T) => React.ReactNode;
};

type Action<T> = {
  label: string;
  onClick: (row: T) => void;
  className?: string;
};

interface TableProps<T> {
  columns: Column<T>[];
  data: T[] | undefined;
  actions?: Action<T>[];
  filterField?: keyof T;
  filterPlaceHolder?: string;
}

export function Table<T extends Record<string, React.ReactNode>>({
  columns,
  data = [],
  actions = [],
  filterPlaceHolder = "",
  filterField,
}: TableProps<T>) {
  const [filter, setFilter] = useState("");

  const filteredData = filterField
    ? data.filter((item) =>
      String(item[filterField])
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    : data;

  return (
    <div className="table-container">
      <div className="table-header">
        {filterField && (
          <input
            type="text"
            placeholder={filterPlaceHolder}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="table-filter"
          />
        )}
      </div>
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.field)}
                  style={{
                    width: col.width ? `${col.width}px` : "auto",
                    flex: col.flex ?? undefined,
                  }}
                >
                  {col.headerName}
                </th>
              ))}
              {actions.length > 0 && <th style={{ width: "148px" }}>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td key={String(col.field)}>
                      {col.renderCell
                        ? col.renderCell(row)
                        : row[col.field]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td>
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                          className={`action-button ${action.className ?? ""}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  style={{ height: "55dvh", textAlign: "center" }}
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                >
                  Dados não encontrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

}
