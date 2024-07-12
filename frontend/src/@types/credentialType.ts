import { ResponseDto } from "../store/user";
import { RequestStatus } from "./requestStatus";

export type Credential = {
    user: ResponseDto | null;
    accessToken: string;
}

export type CredentailState = Credential & {
    isAuth: boolean;
    loginStatus: RequestStatus,
    registerStatus: RequestStatus
}