import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart:(state)=>{
      state.loading=true
        },
    updateUserSuccess:(state,action)=>{
      state.currentUser=action.payload;
      state.error=null;
      state.loading=false
    },
    updateUserFailure:(state,action)=>{
      state.error= action.payload;
      state.loading=false;

    },

deleteUserStart:(state)=>{
state.loading=true;
state.error=null
},

deleteUserFailure:(state,action)=>{
state.loading=false;
state.error=action.payload;
},

deleteUserSuccess:(state)=>{
state.error=null;
state.loading=false;
state.currentUser=null;
},

signoutUserStart:(state)=>{
state.loading=true;
  state.error=null
  },
  
  signoutUserFailure:(state,action)=>{
  state.loading=false;
  state.error=action.payload;
  },
  
  signoutUserSuccess:(state)=>{
  state.error=null;
  state.loading=false;
  state.currentUser=null;
  },
}

});

export const {signoutUserSuccess,signoutUserStart,signoutUserFailure,signInStart,signInFailure,signInSuccess,updateUserStart
,updateUserSuccess,updateUserFailure,deleteUserFailure,deleteUserSuccess,deleteUserStart} = userSlice.actions;
export default userSlice.reducer
