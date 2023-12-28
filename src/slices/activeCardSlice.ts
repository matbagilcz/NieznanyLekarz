import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CARDS } from '../App'

interface ActiveCardState {
  value: CARDS
}

const initialState: ActiveCardState = {
  value: CARDS.ALL,
}

export const activeCardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setActiveCard: (state, action: PayloadAction<CARDS>) => {
      state.value = action.payload
    },
  },
})

export const { setActiveCard } = activeCardSlice.actions

export default activeCardSlice.reducer