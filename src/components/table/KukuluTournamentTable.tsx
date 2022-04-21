import React from 'react'
import { useTable,useSortBy } from 'react-table';

interface KukuluTournamentTableProps {
    columns:any,
    data:any,
}

const KukuluTournamentTable:React.FC<KukuluTournamentTableProps>=({columns, data})=> {

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} className="table table-striped">
    <thead className="thead-dark">
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          <th className="col">#</th>
          {headerGroup.headers.map((column) => {
            return (
              <th
                className="col"
                {...column.getHeaderProps(
                  column.getSortByToggleProps()
                )}
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

        return (
          <tr {...row.getRowProps()}>
            <th scope="row">{index+1}</th>
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  </table>
  )
}
export default KukuluTournamentTable