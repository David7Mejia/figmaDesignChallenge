import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

const Merge = ({ justiceData, casesData }) => {
  const [count, setCount] = useState([]);
  const [merged, setMerged] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    // Count the number of cases per justice and save to object
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
    // Get count and Justice data and merge into one object with points being coordinates on plane
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
    // Set time data to one array for parsing in D3
    const timeData = (justiceData) => {
      let times = [];
      justiceData.forEach((el) => {
        times.push(el[1]);
      });
      return times;
    };
    setTime(timeData(justiceData));

    setMerged(mergeData(justiceData, count));
  }, [casesData, justiceData]);

  const svgRef = useRef();
    const ess = [];
    // Create array with count of cases per justice and the date they joined from the merged data
    // merged data has id of justice to identify who voted => unnecessary for D3
  for (let key in merged) {
    let x = merged[key].points[0];
    let y = merged[key].points[1];
    ess.push([x, y]);
  }
  console.log(ess);

  //   useEffect(() => {
  //     //container
  //     // const parseTime = d3.timeParse("%b %d, %Y");
  //     const w = 1000;
  //       const h = 1000;

  //       var svg = d3.select(svgRef.current);

  //       const mDomain = d3.extent(time);
  //       const xScale = d3
  //       .scaleTime()
  //       .domain(mDomain)
  //           .range([0, w]);

  //       const yScale = d3
  //           .scaleLinear()
  //           .domain([0, d3.max(count)])
  //           .range([h, 0]);

  //       var xAxis = d3.axisBottom(xScale);
  //       svg.append("g").attr("transform", "translate(0,60)").call(xAxis);

  //       svg
  //         .append("g")
  //         .attr("transform", "translate(0,60)")
  //           .call(xAxis.ticks(d3.timeYear));

  //       svg
  //         .append("text")
  //         .attr("transform", "translate(300,95)")
  //         .style("text-anchor", "middle")
  //         .attr("fill", "black")
  //           .text("Dates");

  //       svg
  //         .selectAll("circle")
  //         .data(Object.values(merged))
  //         .enter()
  //         .append("circle")
  //         .attr("r", 5)
  //           .attr("fill", "black")
  //           .attr("cx", function (d) {
  //               return xScale(d.points[0]);
  //           })
  //           .attr("cy", function (d) {
  //               return yScale(d.points[1]);
  //             })

  //   }, [merged, count, justiceData]);

  return (
    <div id="svg-data">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Merge;
