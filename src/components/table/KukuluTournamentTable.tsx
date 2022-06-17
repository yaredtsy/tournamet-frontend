import useTypedSelector from "hooks/useTypedSelector";
import React, { useEffect } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import GlobalFilter from "./GlobalFilter";

import { User } from "firebase/auth";
import Userdata from "components/homepage/userdata.component";
import { Button, Col, Row } from "reactstrap";
import kukuluicon from "assets/img/icon.png";
import congra from "assets/img/congra.png";

interface KukuluTournamentTableProps {
  columns: any;
  data: any;
}

const KukuluTournamentTable: React.FC<KukuluTournamentTableProps> = ({
  columns,
  data,
}) => {
  const {
    tournament,
    players,
  }: {
    tournament: TournamentType | null;
    players: PlayersType[] | null;
  } = useTypedSelector((state) => state.scoreboard);

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
      <Row className="mt-5 mb-4  gy-4 mb-5">
        <Col
          lg="4"
          md="7"
          sm="7"
          xs="12"
          className="d-flex align-items-center justify-content-center"
        >
          <Button
            className="rounded fs-2 ms-2 fs-md-4 shadow fit-content"
            color="primary"
            size="md"
            onClick={(e) => {
              window.location.href =
                "https://play.google.com/store/apps/details?id=com.kinetstore.kukulu";
            }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={kukuluicon}
                alt="kukulu"
                className="img-fluid button-icon"
              />

              <span className="mx-2  fs-6">Download Game to Start Playing</span>
            </div>
          </Button>
        </Col>

        <Col className="d-flex align-items-center" lg="4" md="5" sm="5" xs="12">
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Col>
        <Col lg={4} className="gy-4  ">
          <Userdata />
        </Col>
        <Col
          lg={12}
          md="12"
          sm="12"
          xs="12"
          className="d-flex justify-content-center"
        >
          {tournament && tournament.state == "CLOSED" && (
            <div className=" p-2  text-white d-flex justify-content-center banner shadow-lg ">
              <div className="banner-icon ">
                <img className="banner-icon flip" src={congra} alt="" />
              </div>
              <div className="d-flex flex-column justify-content-center ">
                <span className="display-5 ">Congratulations</span>
                <span className="h6 text-center text-warning">
                  Winners receive their rewards within 24 hours
                </span>
              </div>

              <div className="banner-icon ">
                <img className="banner-icon" src={congra} alt="" />
              </div>
            </div>
          )}
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
