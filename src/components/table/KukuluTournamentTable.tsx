import useTypedSelector from "hooks/useTypedSelector";
import React, { useEffect } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import GlobalFilter from "./GlobalFilter";
import DefaultFilter, {
  DefaultFilterForColumn,
  SelectColumnFilter,
} from "./GlobalFilter";
import { User } from "firebase/auth";
interface KukuluTournamentTableProps {
  columns: any;
  data: any;
}

const KukuluTournamentTable: React.FC<KukuluTournamentTableProps> = ({
  columns,
  data,
}) => {
  const {
    user,
  }: {
    user: User | null;
  } = useTypedSelector((state) => state.user);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);
  const { globalFilter } = state;
  return (
    <>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()} className="table table-striped">
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    className="col"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            const e: PlayersType = row.original as PlayersType;

            let bgcolor: string = "";
            let textColor: string = "";

            if (e.id === user?.uid) {
              bgcolor = "bg-info";
              textColor = " text-white";
            }

            return (
              <tr {...row.getRowProps()} className={bgcolor}>
                {row.cells.map((cell) => {
                  return (
                    <td className={textColor} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default KukuluTournamentTable;
