import axios from "axios";
import { refreshToken } from "../../entities/credential/redux/slice";
import { useAppDispatch } from "../../store/store";
import { API_URL } from "./constants";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.response.use((response) => {
    return response;
}, (async (error) => {
    const origrnalRequest = error.config;
    if(error.responce.status == 401 && error.config && !error.config._isRetry){
        origrnalRequest._isRetry = true;
        try{
            const responseRefreshToken = (await axios.post(`${API_URL}/auth/refresh`, {}, {
                withCredentials: true
            })).data;
            if (responseRefreshToken.error) throw new Error('Failed to refresh token');
            const dispatch = useAppDispatch();
            dispatch(refreshToken(responseRefreshToken));
            return $api.request(origrnalRequest);
        } catch(e){
            console.log('Не авторизован');
        }
    }
    throw error;
}))

export default $api;