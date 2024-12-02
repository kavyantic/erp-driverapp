import { configureStore } from '@reduxjs/toolkit'
import { tripSlice } from './slices/tripSlice'
// ..
import { useDispatch, useSelector } from 'react-redux'
import { authSlice } from './slices/authSlice'

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const store = configureStore({
    reducer: {
        [tripSlice.name]: tripSlice.reducer,
        [authSlice.name]: authSlice.reducer
    }

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()