import useTypedSelector from "hooks/useTypedSelector";
import React, { useEffect } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import GlobalFilter from "./GlobalFilter";

import { User } from "firebase/auth";
import Userdata from "components/homepage/userdata.component";
import { Col, Row } from "reactstrap";
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
      <Row className="mt-5 mb-4 flex-column-reverse flex-sm-row flex-sm">
        <Col className="d-flex align-items-center" lg="6" md="5" sm="5" xs="12">
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Col>
        <Col lg="6" md="7" sm="7" xs="12">
          <Userdata />
        </Col>
      </Row>
      <table {...getTableProps()} className="table table-striped text-white">
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
            let textColor: string = "text-white";

            if (e.id === user?.uid) {
              bgcolor = "bg-info";
              textColor = " text-white fs-5";
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
