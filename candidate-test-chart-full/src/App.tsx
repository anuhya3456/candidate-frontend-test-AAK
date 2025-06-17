import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchData } from './features/dataSlice';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.chart.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div>
      <h1>Sai Anuhya Bandi - Candidate Test Chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="purple" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;