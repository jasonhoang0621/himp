import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null,
    favorite: localStorage.getItem('favo') ? JSON.parse(localStorage.getItem('favo')) : [],
    isModal: false,
  },
  reducers: {
    storeUser(state, action) {
      state.user = action.payload
      localStorage.setItem('authUser', JSON.stringify(action.payload))
    },
    logOut(state, action) {
      state.user = null
    },
    storeFavoList(state, action) {
      state.favorite = action.payload
    },
    addFavoList(state, action) {
      state.favorite = [...state.favorite, action.payload]
      localStorage.setItem("favo", JSON.stringify(state.favorite))
    },
    deleteFavoList(state, action) {
      state.favorite = action.payload
      localStorage.setItem("favo", JSON.stringify(state.favorite))
    },
    toggleModal(state, action) {
      state.isModal = action.payload
    },
  },
})

export const { storeUser, logOut, storeFavoList, addFavoList, deleteFavoList, toggleModal } = userSlice.actions

const { reducer } = userSlice

export default reducer
