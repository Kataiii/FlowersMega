import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";


export const selectUser = createSelector(
    [(state: RootState) => state.credentialReducer.user],
    (user) => user
);

export const selectToken = createSelector(
    [(state: RootState) => state.credentialReducer.accessToken],
    (accessToken) => accessToken
);

export const selectAuth = createSelector(
    [(state: RootState) => state.credentialReducer.isAuth],
    (isAuth) => isAuth
)

export const selectAdmin = createSelector(
    [(state: RootState) => state.credentialReducer.isAdmin],
    (isAdmin) => isAdmin
)

export const selectIsRemember = createSelector(
    [(state: RootState) => state.credentialReducer.isRemember],
    (isRemember) => isRemember
);