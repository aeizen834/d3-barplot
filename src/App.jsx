import * as d3 from 'd3';
import { BarPlot } from './BarPlot';

const data = [
  { country: "United States", students: 68 },
  { country: "France", students: 21 },
  { country: "United Kingdom", students: 21 },
  { country: "Germany", students: 20 },
  { country: "Switzerland", students: 13 },
  { country: "Spain", students: 10 },
  { country: "Netherlands", students: 9 },
  { country: "India", students: 9 },
  { country: "Singapore", students: 8 },
  { country: "Ireland", students: 8 },
  { country: "Sweden", students: 7 },
  { country: "Australia", students: 7 },
  { country: "Canada", students: 6 },
  { country: "Finland", students: 5 },
  { country: "Mexico", students: 4 },
  { country: "Brazil", students: 4 },
  { country: "Saudi Arabia", students: 3 },
  { country: "Romania", students: 3 },
  { country: "Philippines", students: 3 },
  { country: "New Zealand", students: 3 },
];

// Pass an accessor so d3.max compares the numbers, not the objects
const maxValue = d3.max(data, (d) => d.students);

function App() {
  return (
    <div>
      <p>Max Value: {maxValue}</p>
      <BarPlot width={700} height={500} data={data.filter((d) => d.students > 3)} />
    </div>
  );
}

export default App;