import * as d3 from 'd3';

const MARGIN = { top: 20, right: 30, bottom: 30, left: 110 };
const BAR_PADDING = 0.2;

export const BarPlot = ({ width, height, data }) => {
  // Bounds = area inside the axes
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Sort largest to smallest
  const sortedData = [...data].sort((a, b) => b.students - a.students);

  // --- D3 computes the scales ---
  // Y: one band per country
  const yScale = d3
    .scaleBand()
    .domain(sortedData.map((d) => d.country))
    .range([0, boundsHeight])
    .padding(BAR_PADDING);

  // X: number of students
  const maxValue = d3.max(sortedData, (d) => d.students) ?? 0;
  const xScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, boundsWidth])
    .nice();

  // --- React renders the shapes ---
  const grid = xScale.ticks(5).map((value) => (
    <g key={value}>
      <line
        x1={xScale(value)}
        x2={xScale(value)}
        y1={0}
        y2={boundsHeight}
        stroke="#e0e0e0"
      />
      <text
        x={xScale(value)}
        y={boundsHeight + 18}
        textAnchor="middle"
        fontSize={11}
        fill="#666"
      >
        {value}
      </text>
    </g>
  ));

  const bars = sortedData.map((d) => {
    const y = yScale(d.country);
    if (y === undefined) return null;

    return (
      <g key={d.country}>
        <rect
          x={0}
          y={y}
          width={xScale(d.students)}
          height={yScale.bandwidth()}
          fill="#69b3a2"
          rx={2}
        />
        {/* Country label to the left of the bar */}
        <text
          x={-8}
          y={y + yScale.bandwidth() / 2}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={12}
        >
          {d.country}
        </text>
        {/* Value label at the end of the bar */}
        <text
          x={xScale(d.students) + 5}
          y={y + yScale.bandwidth() / 2}
          dominantBaseline="middle"
          fontSize={11}
          fill="#444"
        >
          {d.students}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${MARGIN.left},${MARGIN.top})`}
      >
        {grid}
        {bars}
      </g>
    </svg>
  );
};
