import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
//AsyncThunk is used because Async Functions are complex in Redux, so we use a middleware of redux AsyncThunk, it also provides Promises Lifecyle 
//Action
export const getAllUsers=createAsyncThunk("getUsers",async (_, { getState })=>
{
  const state = getState();
  const city = state.todo.city;
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=ef002d55db35874b6819c01d54212f27`);
    const result=response.json()
    return result
})
const Todo = createSlice({
  name: "todo",
  initialState:{
    users:[],
    isLoading:false, 
    error:null,
    city:""
},
  reducers: {
    addCity:(state,action)=>
    {
      state.city=action.payload
    }
  },
  extraReducers:{
    [getAllUsers.pending]:(state)=>
    {
        state.isLoading=true;
    },
    [getAllUsers.fulfilled]:(state,action)=>
    {
        state.isLoading=false;
        state.users=action.payload;
    }
  }
});

export const {addCity} = Todo.actions

export default Todo.reducer