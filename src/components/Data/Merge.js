import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

const Merge = ({ justiceData, casesData }) => {
  const [count, setCount] = useState([]);
  const [merged, setMerged] = useState([]);

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
      let parseTime = d3.timeParse("%Y-%m-%d");
      justiceData.forEach((el) => {
        if (count[el[0]]) {
          let char = parseTime(el[1]);
          mergedData[el[0]] = {
            id: el[0],
            points: [char, count[el[0]]],
          };
        }
      });
      return mergedData;
    };

    setMerged(mergeData(justiceData, count));
  }, [casesData, justiceData]);

  const svgRef = useRef();
  const coordinates = [];
  // Create array with count of cases per justice and the date they joined from the merged data
  // merged data has id of justice to identify who voted => unnecessary for D3
  for (let key in merged) {
    coordinates.push(merged[key].points);
  }

  useEffect(() => {
    const w = 1000;
    const h = 500;
    let svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .attr("viewBox", `0 0 ${w} ${h}`)
      .style("margin-top", "50px");

    let xScale = d3
      .scaleTime()
      .domain(d3.extent(coordinates, (d) => d[0]))
      .range([0, w]);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(coordinates, (d) => d[1])])
      .range([h, 0]);

    let xAxis = d3.axisBottom(xScale);

    let yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      //   .attr("transform", "translate(30, " + (h-20) + ")")
      .attr("transform", `translate(0, ${h})`)
      .call(xAxis);

    svg
      .append("g")
      //   .attr("transform", "translate(30, -20)")
      .call(yAxis);

    //set axis labels
      svg
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (h / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Number of Cases");

      svg
          .append("text")
          .attr("y", h - margin.bottom)
          .attr("x", w / 2)
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Date Joined");
        

    svg
      .selectAll("circle")
      .data(coordinates)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 3)
      .attr("fill", "#69b3a2");
  }, [coordinates]);

  return (
    <div id="svg-data">
      {count && <svg className="data-svg" ref={svgRef}></svg>}
    </div>
  );
};

export default Merge;
