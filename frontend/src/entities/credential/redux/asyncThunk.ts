import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../shared/utils/constants";
import { AuthDto, AuthResponseDto, RecoveryDto, RegistDto } from "../../../store/auth";

export const loginThunk = createAsyncThunk(
    'login',
    async (dto: AuthDto) => {
        const response: AuthResponseDto = (await axios.post(`${API_URL}/auth/login`, dto, {
            withCredentials: true
        })).data;
        return response;
    }
);

export const registThunk = createAsyncThunk(
    'regist',
    async (dto: RegistDto) => {
        const response: AuthResponseDto = (await axios.post(`${API_URL}/auth/register`, dto, {
            withCredentials: true
        })).data;
        return response;
    }
);

export const logoutThunk = createAsyncThunk(
    'logout',
    async () => {
        const response = await axios.post(`${API_URL}/auth/logout`, {}, {
            withCredentials: true
        });
        return response;
    }
);

export const refreshThunk = createAsyncThunk(
    'refresh',
    async () => {
        const response: AuthResponseDto = (await axios.post(`${API_URL}/auth/refresh`, {}, {
            withCredentials: true
        })).data;
        return response;
    }
);

export const recoveryThunk = createAsyncThunk(
    'recovery',
    async (dto: RecoveryDto) => {
        const response = await axios.post(`${API_URL}/auth/recovery`, {}, {
            withCredentials: true
        });
        return response;
    }
);