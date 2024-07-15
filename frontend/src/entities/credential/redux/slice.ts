//@ts-nocheck
import { createAction, createSlice } from "@reduxjs/toolkit";
import { CredentailState } from "../../../@types/credentialType";
import { RequestStatus } from "../../../@types/requestStatus";
import { ResponseDto } from "../../../store/user";
import { loginThunk, registThunk, logoutThunk, refreshThunk } from "./asyncThunk";

export const addCredentialsUser = createAction<ResponseDto>('addCredentialsUser');
export const logOut = createAction('logOut');

const initialState: CredentailState = {
    user: null,
    accessToken: null,
    isAuth: false,
    loginStatus: RequestStatus.NEVER,
    registerStatus: RequestStatus.NEVER
};

const credentialSlice = createSlice({
    name: "credential",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCredentialsUser, (state, action) => {
            state.user = action.payload;
        }),
        builder.addCase(loginThunk.pending, state => {
            state.loginStatus = RequestStatus.LOADING;
        }),
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            const payload = action.payload;
            console.log(payload);
            state.loginStatus = RequestStatus.SUCCESSFUL;
            state.accessToken = payload.accessToken ?? null;
            console.log(payload.user);
            state.user = payload.user ?? null;
            state.isAuth = true;
        }),
        builder.addCase(registThunk.pending, state => {
            state.registerStatus = RequestStatus.LOADING;
        }),
        builder.addCase(registThunk.fulfilled, (state, action) => {            
            state.registerStatus = RequestStatus.SUCCESSFUL;
            state.accessToken = action.payload.accessToken ?? null;
            state.user = action.payload.user ?? null;
            state.isAuth = true;
        }),
        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.token = "";
            state.isAuth = false;
            state.user = null;
        }),
        builder.addCase(refreshThunk.fulfilled, (state, action) => {
            state.loginStatus = RequestStatus.SUCCESSFUL;
            state.accessToken = action.payload.accessToken ?? '';
            state.user = action.payload.user;
            state.isAuth = true;
        })
    }
})

export const credentialReducer = credentialSlice.reducer;