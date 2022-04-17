# Figma Design Challenge 

* Create a responsive clone of the Figma file, specifically Web and iPhone. 
* Display the diffferent sections of design. 
* Create a D3.js data visualization scatter plot. 
* Fetch data from seperate API's for chart data.

## Available Scripts

In the project directory, you can run:

### `npm start`

# D3.js Data Visualization
### Inside useEffect ../components/Data 

# ![image](https://github.com/David7Mejia/figmaDesignChallenge/public/Screenshot(67).png)
```js
useEffect(() => {
    const w = 800;
    const h = 500;
    let svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .attr("viewBox", `0 0 ${w} ${h}`)
      .style("margin", "10px");

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
      .attr("transform", `translate(0, ${h})`)
      .call(xAxis);

    svg
      .append("g")
      .call(yAxis);

    //set axis labels
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -50 + 2 / h)
      .attr("x", 0 - h / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Cases");

    svg
      .append("text")
      .attr("y", 30 + h)
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
  ```
