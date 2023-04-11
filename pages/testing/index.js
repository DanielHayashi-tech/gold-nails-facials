import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeframe" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="activeClients" fill="#8884d8" />
          <Bar dataKey="inactiveClients" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
