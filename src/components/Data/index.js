import React, { useEffect, useState, useRef } from "react";
import "./Data.css";
import Merge from "./Merge";
import * as d3 from "d3";

const Data = () => {
  const [justiceData, setJusticeData] = useState([]);
  const [casesData, setCasesData] = useState([]);
  // const [count, setCount] = useState(null);
  // const [merged, setMerged] = useState(null);

  // const svgRef = useRef();
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
    // setCasesData(votes);
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

// console.log(casesData, justiceData)

  return (
    <div className='data-section'>
      <h1 className="section-title" id="data-title">
        Data
      </h1><div className='data-content-holder'>

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
