import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//AsyncThunk is used because Async Functions are complex in Redux, so we use a middleware of redux AsyncThunk, it also provides Promises Lifecyle 
//Action
export const getAllWeather = createAsyncThunk("getWeather", async (_, { getState }) => {
  const state = getState();
  const city = state.weather.city;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=ef002d55db35874b6819c01d54212f27`);
  const result = response.json()
  return result
})
const Weather = createSlice({
  name: "weather",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    city: ""
  },
  reducers: {
    addCity: (state, action) => {
      state.city = action.payload
    }
  },
  extraReducers: {
    [getAllWeather.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllWeather.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    }
  }
});

export const { addCity } = Weather.actions

export default Weather.reducer