import { configureStore } from '@reduxjs/toolkit'
import activeCardReducer from './slices/activeCardSlice'
import favoriteDoctorsReducer from './slices/favoriteDoctorsSlice'

export const store = configureStore({
  reducer: {
    activeCard: activeCardReducer,
    favoriteDoctor: favoriteDoctorsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch