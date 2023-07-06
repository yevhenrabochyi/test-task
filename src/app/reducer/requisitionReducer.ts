import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../../app/store'
import { type RequisitionsDataType } from '../../api/fetchDataPromise'

const initialState: { value: RequisitionsDataType[] } = {
  value: []
}

export const requisitionsSlice = createSlice({
  name: 'requisitions',
  initialState,
  reducers: {
    setAllRequisitions: (state, action: PayloadAction<RequisitionsDataType[]>) => {
      state.value = [...action.payload]
    },
    addNewRequisition: (state, action: PayloadAction<RequisitionsDataType>) => {
      state.value = [action.payload, ...state.value]
    },
    editRequisition: (state, action: PayloadAction<RequisitionsDataType>) => {
      const newValue = state.value.map((elem) => {
        if (elem.id === action.payload.id) return action.payload
        return elem
      })
      state.value = newValue
    },
    deleteRequisition: (state, action: PayloadAction<string>) => {
      const newValue = state.value.filter((elem) => elem.id !== action.payload)
      state.value = newValue
    }

  }
})

export const { setAllRequisitions, addNewRequisition, editRequisition, deleteRequisition } = requisitionsSlice.actions

export const selectRequisitions = (state: RootState): RequisitionsDataType[] => state.requisitions.value

export default requisitionsSlice.reducer
