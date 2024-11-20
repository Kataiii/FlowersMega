import { PasswordForm } from "../features/change-password/ChangePassword";
import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authControllerLogin: build.mutation<
      AuthControllerLoginApiResponse,
      AuthControllerLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.authDto,
      }),
    }),
    authControllerRegisterUser: build.mutation<
      AuthControllerRegisterUserApiResponse,
      AuthControllerRegisterUserApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/register/user`,
        method: "POST",
        body: queryArg.registDto,
      }),
    }),
    authControllerLogout: build.mutation<
      AuthControllerLogoutApiResponse,
      AuthControllerLogoutApiArg
    >({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),
    authControllerRefresh: build.query<
      AuthControllerRefreshApiResponse,
      AuthControllerRefreshApiArg
    >({
      query: () => ({ url: `/auth/refresh` }),
    }),
    authControllerCheckPermissions: build.query<
      AuthControllerCheckPermissionsApiArg,
      AuthControllerCheckPermissionsApiResponse
    >({
      query:  () => '/auth/check-permission',
      transformResponse: (response: any, meta: any) => ({
        ...response,
        status: meta.response?.status || 200
      })
    }),
    authControllerRecoveryPassword: build.mutation<
      AuthControllerRecoveryPasswordApiResponse,
      AuthControllerRecoveryPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/recovery`,
        method: "POST",
        body: queryArg.recoveryDto,
      }),
    }),
    authControllerChangePassword: build.mutation<
      AuthControllerChangePasswordApiResponse,
      AuthControllerCgangePasswordApiArg
    >({
      query: (queryArgs) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: queryArgs.changePasswordDto
      }),
    })
  }),
  overrideExisting: false,
});
export { injectedRtkApi as authApi };
export type AuthControllerLoginApiResponse = /** status 200  */ AuthResponseDto;
export type AuthControllerLoginApiArg = {
  authDto: AuthDto;
};
export type AuthControllerRegisterUserApiResponse =
  /** status 200  */ AuthResponseDto;
export type AuthControllerRegisterUserApiArg = {
  registDto: RegistDto;
};
export type AuthControllerLogoutApiResponse = unknown;
export type AuthControllerLogoutApiArg = void;
export type AuthControllerRefreshApiResponse =
  /** status 200  */ AuthResponseDto;
export type AuthControllerRefreshApiArg = void;
export type AuthControllerCheckPermissionsApiArg = null;
export type AuthControllerCheckPermissionsApiResponse = any;
export type AuthControllerRecoveryPasswordApiResponse =
  /** status 200  */ AuthResponseDto;
export type AuthControllerRecoveryPasswordApiArg = {
  recoveryDto: RecoveryDto;
};
export type AuthControllerChangePasswordApiResponse = /** status 200  */ ResponseDto;
export type AuthControllerCgangePasswordApiArg = { 
  changePasswordDto: PasswordForm;
};

export type ResponseDto = {
  /** Surname */
  surname?: string;
  /** Name */
  firstname: string;
  /** Patronymic */
  patronymic?: string;
  /** Phone */
  phone: string;
  /** Email */
  email: string;
  /** Is checked email */
  checkedEmail?: boolean;
  /** Password */
  password: string;
  /** Unique identifie */
  idCity?: number;
  /** Avatar image url */
  urlAvatar?: string;
};
export type AuthResponseDto = {
  /** Refresh token */
  refreshToken: string;
  /** Access token */
  accessToken: string;
  /** User info */
  user: ResponseDto;
};
export type AuthDto = {
  /** Email */
  email: string;
  /** Password */
  password: string;
  /** Save the user for the next login */
  rememberMe: boolean;
};
export type RegistDto = {
  /** Name */
  name: string;
  /** Email */
  email: string;
  /** Phone */
  phone: string;
  /** Password */
  password: string;
  /** Repeat password */
  repeatPassword: string;
};
export type RecoveryDto = {
  /** Email */
  email: string;
};
export const {
  useAuthControllerLoginMutation,
  useAuthControllerRegisterUserMutation,
  useAuthControllerLogoutMutation,
  useAuthControllerRefreshQuery,
  useAuthControllerRecoveryPasswordMutation,
  useAuthControllerChangePasswordMutation,
  useAuthControllerCheckPermissionsQuery
} = injectedRtkApi;
