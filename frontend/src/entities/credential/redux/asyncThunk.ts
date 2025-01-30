import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../shared/utils/constants";
import { AuthDto, AuthResponseDto, RecoveryDto, RegistDto } from "../../../store/auth";

export const loginThunk = createAsyncThunk(
    'login',
    async (dto: AuthDto, { rejectWithValue }) => {
        try {
            const response: AuthResponseDto = (await axios.post(`${API_URL}/auth/login`, dto, {
                withCredentials: true
            })).data;
            return response;
        } catch (error: any) {
            if (error?.response?.status === 401 && error?.response?.data?.message === "Invalid password or login") {
                return rejectWithValue("Such an account not exists");
            }
        }

    }
);

export const registThunk = createAsyncThunk(
    'regist',
    async (dto: RegistDto, { rejectWithValue }) => {
        try {
            const response: AuthResponseDto = (await axios.post(`${API_URL}/auth/register`, dto, {
                withCredentials: true
            })).data;
            return response;
        } catch (error: any) {
            if (error?.response?.status === 400 && error?.response?.data?.message === "Such an account already exists") {
                return rejectWithValue("Such an account already exists");
            }
            return rejectWithValue(error?.response?.data || error?.message);
        }
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