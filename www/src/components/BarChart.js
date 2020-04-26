import React, { PureComponent } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const colorsList = ['#008f68', '#6db65b', '#4aae9b', '#dfa612']

class ExampleChart extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={this.props.data}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 10]} />
            <Tooltip />
            <Legend />

            {this.props.bars.map((bar, i) => (
              <Bar dataKey={bar} fill={colorsList[i]} key={`bar_${i}`} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default ExampleChart
