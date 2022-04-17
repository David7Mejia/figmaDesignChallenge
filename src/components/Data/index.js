import React, { useEffect, useState } from "react";
import "./Data.css";
import Merge from "./Merge";

const Data = () => {
  const [justiceData, setJusticeData] = useState([]);
  const [casesData, setCasesData] = useState([]);

  useEffect(() => {
    const votes = [];
    const getCases = async () => {
      const res = await fetch(
        "https://frontend-exercise-api.herokuapp.com/cases/?filter=landmark"
      );

      let data = await res.json();
      data = Object.entries(data);
      data.forEach((el) => {
        votes.push(...el[1].majority, ...el[1].dissents, ...el[1].other);
      });
      setCasesData(votes);
    };
    getCases();

    const justices = [];
    const getJustices = async () => {
      const res = await fetch(
        "https://frontend-exercise-api.herokuapp.com/justices/"
      );
      const data = await res.json();
      data.forEach((el) => {
        justices.push([el.id, el.start_date.split("T")[0]]);
      });
      setJusticeData(justices);
    };
    getJustices();
  }, []);


  return (
    <div className='data-section'>
      <h1 className="section-title" id="data-title">
        Data
      </h1><div className='data-content-holder' id='res-data'>

      {justiceData.length > 0 && casesData.length > 0 && (
        <Merge
        justiceData={justiceData}
        casesData={casesData}
        />
        )
      }
      </div>
    </div>
  );
};

export default Data;
