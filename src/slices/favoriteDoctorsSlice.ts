import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DoctorType } from '../components/Card/Card'

interface DoctorsState {
  doctorsArray: DoctorType[]
}

const initialState: DoctorsState = {
  doctorsArray: []
}

export const favoriteDoctorsSlice = createSlice({
  name: 'my-doctors',
  initialState,
  reducers: {
    addDoctorToFavorites: (state, action: PayloadAction<DoctorType>) => {
      state.doctorsArray.push(action.payload)
    },
    removeDoctorFromFavorites: (state, action: PayloadAction<DoctorType>) => {
      state.doctorsArray = state.doctorsArray.filter((item) => item.ID !== action.payload.ID)
    },
  },
})

export const { addDoctorToFavorites, removeDoctorFromFavorites } = favoriteDoctorsSlice.actions

export default favoriteDoctorsSlice.reducer