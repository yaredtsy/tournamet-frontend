import React, { useEffect, useState } from "react";

import { db } from "utils/firebase";
import { collection, getDocs, where, query } from "firebase/firestore/lite";

import { Container } from "reactstrap";
import { NavBar } from "components/common";
import KukuluTournamentTable from "components/table/KukuluTournamentTable";

function HomePage() {
  // const data: ScoreBoardType[] = React.useMemo(() => [], []);

  const [data, setList] = useState<PlayersType[]>([]);
  useEffect(() => {
    const tournaments = query(
      collection(db, "tournamentPRO"),
      where("state", "!=", "OPENED")
    );
    
    
    getDocs(tournaments).then((result) => {
      const list: PlayersType[] | undefined = [];
      console.log(result);
    
      getDocs(collection(db, "tournamentPRO", result.docs[0].id, "user")).then(
        (docs) => {
          docs.forEach((user) => {
            const userData = user.data();

            const scorebaord: PlayersType | undefined = {
              name: user.data().name,
              score: user.data().score,
              rank: user.data().rank,
            };

            list.push(scorebaord);
          });
          setList(list);
          console.log("tournamentPRO");
        }
      );
      // const users = query()
    });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        // first group - TV Show
        Header: "name",
        // First group columns
        accessor: "name" as const,
      },
      {
        // Second group - Details
        Header: "score",
        // Second group columns
        accessor: "score" as const,
      },
      {
        // Second group - Details
        Header: "rank",
        // Second group columns
        accessor: "rank" as const,
      },
    ],
    []
  );

  return (
    <>
      <NavBar />
      {data.length == 0 ? (
        <>no user found</>
      ) : (
        <Container className="mt-5">
          <KukuluTournamentTable columns={columns} data={data} />
        </Container>
      )}
    </>
  );
}

export default HomePage;
