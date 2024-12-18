import { ResponseDto } from "../store/user";
import { RequestStatus } from "./requestStatus";

export type Credential = {
    user: ResponseDto | null;
    accessToken: string;
}

export type CredentailState = {
    user: ResponseDto | null;
    accessToken: string | null;
    isAuth: boolean;
    isAdmin: boolean;
    loginStatus: RequestStatus,
    registerStatus: RequestStatus
}