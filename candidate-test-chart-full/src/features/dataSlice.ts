import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface DataPoint {
  date: string;
  value: number;
}

interface ChartState {
  data: DataPoint[];
}

const initialState: ChartState = {
  data: [],
};

export const fetchData = createAsyncThunk('chart/fetchData', async () => {
  const res = await axios.get('https://django-dev.aakscience.com/candidate_test/fronted');
  const raw = res.data;
  const extracted: DataPoint[] = [];

  for (const year in raw[0]) {
    const months = raw[0][year];
    for (const monthObj of months) {
      for (const month in monthObj) {
        for (const entry of monthObj[month]) {
          const [datetime, value] = Object.entries(entry)[0];
          extracted.push({
            date: datetime.split(',')[0],
            value: value as number
          });
        }
      }
    }
  }

  return extracted;
});

const dataSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default dataSlice.reducer;