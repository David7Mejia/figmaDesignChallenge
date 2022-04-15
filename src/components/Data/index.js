import React, { useEffect, useState, useRef } from "react";
import "./Data.css";
import * as d3 from "d3";

const Data = () => {
  const [data, setData] = useState([]);
  const [votes, setVotes] = useState([]);
  const [time, setTime] = useState([]);
  let myHash = {};
  const svgRef = useRef();

  useEffect(() => {
    let votes = [];
    let justi = [];
    let times = [];
    const fetchJustices = async () => {
      let res = await fetch(
        "https://frontend-exercise-api.herokuapp.com/justices"
      );
      let justiceData = await res.json();
      justiceData = Object.values(justiceData);
      justiceData.forEach((justice) => {
        justi.push([
          justice.id,
          justice.name,
          justice.start_date.split("T")[0],
        ]);
        times.push(justice.start_date.split("T")[0]);
      });
      setTime(times);
      setData(justi);
    };
    fetchJustices().catch((err) => console.log(err));

    const fetchCases = async () => {
      let res = await fetch(
        "https://frontend-exercise-api.herokuapp.com/cases/?filter=landmark"
      );
      let casesData = await res.json();
      casesData = Object.entries(casesData);
        // console.log(casesData)
      casesData.forEach((ele) => {
        votes.push(...ele[1].dissents, ...ele[1].majority, ...ele[1].other);
      });
    };
    setVotes(votes);
    fetchCases().catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   //setup container
  //   const margins = { right: 50, left: 50, top: 50, bottom: 50 };
  //   const width =
  //     parseInt(d3.select(svgRef.current).style("width")) -
  //     margins.left -
  //     margins.right;
  //   const height =
  //     parseInt(d3.select(svgRef.current).style("height")) -
  //     margins.top -
  //     margins.bottom;

  //   // reference to the svg and setup margins
  //   const svg = d3
  //     .select(svgRef.current)
  //     .attr("width", width + margins.left + margins.right)
  //     .attr("height", height + margins.top + margins.bottom);

  //   // setup scales and axes (x and y) time from data and cases from cases
  //   // let parseTime = d3.timeParse("%Y-%m-%d");
  //   // let domain = d3.extent(Object.values(myHash.start_date), (d) => parseTime(d));

  //   // let xScale = d3.scaleTime().domain(domain).range([0, width]);

  //   // let yScale = d3
  //   //   .scaleLinear()
  //   //   .domain([0, d3.max(time, (d) => myHash[d])])
  //   //   .range([height, 0]);

  //   // let xAxis = d3.axisBottom(xScale);
  //   // let yAxis = d3.axisLeft(yScale);

  //   // svg
  //   //   .append("g")
  //   //   .attr("transform", `translate(${margins.left}, ${height + margins.top})`)
  //   //   .call(xAxis.ticks(20));

  //   // svg
  //   //   .append("g")
  //   //   .attr("transform", `translate(${margins.left}, ${margins.top})`)
  //   //   .call(yAxis);





  // }, [votes, data]);


  if (votes) {
    votes.forEach((el, i) => {
      if (!myHash[el]) {
        myHash[el] = {
          count: 1,
        };
      } else {
        myHash[el].count++;
      }
    });

    data.forEach(el => {
      if(myHash[el[0]]){
        myHash[el[0]].name = el[1]
        myHash[el[0]].start_date = el[2]
      }

    })
    // console.log('HASH values', Object?.values(myHash))
    // console.log('HASH', myHash)
    // console.log('DATA',data)
    // console.log('VOTES',votes)
  }

  console.log(Object.entries(myHash));
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
