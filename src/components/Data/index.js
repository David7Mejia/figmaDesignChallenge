import React, { useEffect, useState, useRef } from "react";
import "./Data.css";
import * as d3 from "d3";

const Data = () => {
  const [jData, setJData] = useState([]);
  const [cData, setCData] = useState([]);

  const hash = {};
  const svgRef = useRef();

  useEffect(() => {
    let datum = {};
    let votes = [];
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
    fetchJustices().catch((err) => console.log(err));
    setJData(datum);

    const fetchCases = async () => {
      let res = await fetch("https://frontend-exercise-api.herokuapp.com/cases/?filter=landmark");

      let data = await res.json();

      data = Object.entries(data);
      // console.log(data);
      data.forEach((ele) => {
        votes.push(...ele[1].dissents, ...ele[1].majority, ...ele[1].other);
      });
    };
    fetchCases().catch((err) => console.log(err));
    setCData(votes);
  }, []);

  if (cData) {
    cData.forEach(el => {
      if (!hash[el]) {
        hash[el] = 1;
      }
      else {
        hash[el]++;
      }
    })
  }
  // console.log(Object.entries(hash))
  let entries = Object.entries(hash)

  if (jData) {
    entries.forEach(el => {
      //el 0 is the key, el 1 is the value
debugger
      if(jData[el[0]]) {
        jData[el[0]].push(el[1])
      }
    })
    console.log(jData)
  }



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
