import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null,
    favorite: [],
  },
  reducers: {
    storeUser(state, action) {
      state.user = action.payload
      localStorage.setItem('authUser', JSON.stringify(action.payload))
    },
    logOut(state, action) {
      state.user = null
      localStorage.removeItem('authUser')
    }
  },
})

export const { storeUser, logOut } = userSlice.actions

const { reducer } = userSlice

export default reducer
