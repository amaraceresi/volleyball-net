import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    createdAt: '',
    updatedAt: ''
  },
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action) => {
      const userObj = {
        ...action.payload.data,
      };

      delete userObj.password;
      delete userObj.__v;

      state.userData = userObj;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.userData = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        createdAt: '',
        updatedAt: ''
      };
      state.isAuthenticated = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuthenticatedUser, logOut } = userSlice.actions

export const getUser = () => (state) =>
  state?.[userSlice.name];


export default userSlice.reducer
