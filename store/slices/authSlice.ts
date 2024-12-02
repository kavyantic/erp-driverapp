import { INSTITUTE_INFO_KEY, SESSION_INFO_KEY } from '@/constants';
import { deleteFromStore, saveToSecureStore } from '@/utils/storageUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '@store';
// import type { RootState } from '../../app/store'
import * as Location from "expo-location"

export interface Institute {
    name: string
    id: number;
    logo: string;
}

export interface User {
    name: string;
    token: string;
    username: string;
}



export interface AuthSlice {
    user: User | null
    , institute: Institute | null

}

const initialState: AuthSlice = {
    institute: null,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateInstitute(state, action: PayloadAction<AuthSlice['institute']>) {
            state.institute = action.payload
        },
        login(state, action: PayloadAction<User>) {
            state.user = action.payload

        },

        logout(state) {
            state.user = null
        }

    }
    ,
    extraReducers: (builder) => {
        builder
            .addMatcher<AppDispatch>(login.match,
                (data) => {
                    saveToSecureStore(SESSION_INFO_KEY, data.user)
                })
            .addMatcher<AppDispatch>(updateInstitute.match,
                (data) => {
                    saveToSecureStore(INSTITUTE_INFO_KEY, data.institute)
                })
            .addMatcher<AppDispatch>(logout.match,
                (data) => {
                    deleteFromStore(SESSION_INFO_KEY)
                }
            )


    },
})

export const { login, updateInstitute, logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

