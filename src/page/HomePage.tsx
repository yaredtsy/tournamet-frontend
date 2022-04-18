import React from "react";
import { useTable, useSortBy} from "react-table";

import { Container } from "reactstrap";
import { NavBar } from "components/common";

function HomePage() {
  
  const data = React.useMemo(
    () => [
    {
      col1: "Hello",
      col2: "World",
    },
    {
      col1: "react-table",
      col2: "rocks",
    },
    {
      col1: "whatever",
      col2: "you want",
    },
  ],[]);

  const columns = React.useMemo(
    () => [
      {
        // first group - TV Show
        Header: "TV Show",
        // First group columns
        accessor: "col1" as const,
      },
      {
        // Second group - Details
        Header: "Details",
        // Second group columns
        accessor: "col2" as const,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data },useSortBy);

  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <table {...getTableProps()} className="table table-striped">
          <thead className="thead-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th className="col">#</th>
                {headerGroup.headers.map((column) => (
                  <th className="col" {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  <th scope="row">{index}</th>
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
      </Container>
    </>
  );
}

export default HomePage;
