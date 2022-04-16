import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

const Merge = ({ justiceData, casesData }) => {
  // console.log({justiceData, casesData});
  const [count, setCount] = useState([]);
  const [merged, setMerged] = useState([]);

  useEffect(() => {
    let casesCount = (casesData) => {
      let cases = {};
      casesData.forEach((el) => {
        if (cases[el]) {
          cases[el] += 1;
        } else {
          cases[el] = 1;
        }
      });
      return cases;
    };
    setCount(casesCount(casesData));

    const mergeData = (justiceData, count) => {
      let mergedData = {};
      justiceData.forEach((el) => {
        if (count[el[0]]) {
          mergedData[el[0]] = {
            id: el[0],
            points: [el[1], count[el[0]]],
          };
        }
      });
      return mergedData;
    };

    setMerged(mergeData(justiceData, count));
  }, [casesData, justiceData]);

  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width =
      parseInt(d3.select(svgRef.current).style("width")) -
      margin.left -
      margin.right;
    const height =
      parseInt(d3.select(svgRef.current).style("height")) -
      margin.top -
        margin.bottom;

      const svg = d3
          .select(svgRef.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)

        


  }, []);

  return (
    <div id="svg-data">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Merge;
