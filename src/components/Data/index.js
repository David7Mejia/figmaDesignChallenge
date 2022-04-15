import React, { useEffect, useState, useRef } from "react";
import "./Data.css";
import * as d3 from "d3";

const Data = () => {
  const [jData, setJData] = useState([]);

  const svgRef = useRef();

  useEffect(() => {
    let datum = {};

    const fetchJustices = async () => {
      let res = await fetch("https://frontend-exercise-api.herokuapp.com/justices");

      let data = await res.json();

      for (let i = 0; i < data.length; i++) {
        let just = data[i];
        if (!datum[just.id]) {
          datum[just.id] = [just.name, just.start_date.split("T")[0]];
        }
      }
    };
    setJData(datum);
    fetchJustices().catch((err) => console.log(err));

    const fetchCases = async () => {
      let res = await fetch("https://frontend-exercise-api.herokuapp.com/cases/?filter=landmark");

      let data = await res.json();
      
      console.log(data);
    };
    fetchCases().catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="section-title" id="data-title">
        Data
      </h1>
      <div className="data-content-holder">
        <svg className="data-svg" ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default Data;
