import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersControllerCreate: build.mutation<
      UsersControllerCreateApiResponse,
      UsersControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/users`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),
    usersControllerUpdate: build.mutation<
      UsersControllerUpdateApiResponse,
      UsersControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/users`,
        method: "PATCH",
        body: queryArg.updateUserDto,
      }),
    }),
    usersControllerDelete: build.mutation<
      UsersControllerDeleteApiResponse,
      UsersControllerDeleteApiArg
    >({
      query: () => ({ url: `/users`, method: "DELETE" }),
    }),
    usersControllerGetById: build.query<
      UsersControllerGetByIdApiResponse,
      UsersControllerGetByIdApiArg
    >({
      query: () => ({ url: `/users/user` }),
    }),
    usersControllerUpdateAvatar: build.mutation<
      UsersControllerUpdateAvatarApiResponse,
      UsersControllerUpdateAvatarApiArg
    >({
      query: (queryArgs) => ({
        url: `/users/avatar`,
        method: "PATCH",
        formData: true,
        body: queryArgs
      })
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as userApi };
export type UsersControllerCreateApiResponse = /** status 201  */ ResponseDto;
export type UsersControllerCreateApiArg = {
  createUserDto: CreateUserDto;
};
export type UsersControllerUpdateApiResponse = /** status 200  */ ResponseDto;
export type UsersControllerUpdateApiArg = {
  updateUserDto: UpdateUserDto;
};
export type UsersControllerUpdateAvatarApiResponse = /** status 200 */ ResponseDto;
export type UsersControllerUpdateAvatarApiArg = {
  file: File | null;
}
export type UsersControllerDeleteApiResponse = /** status 200  */ ResponseDto;
export type UsersControllerDeleteApiArg = void;
export type UsersControllerGetByIdApiResponse = /** status 200  */ ResponseDto;
export type UsersControllerGetByIdApiArg = void;
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
export type CreateUserDto = {
  /** Firstname */
  firstname: string;
  /** Phone */
  phone: string;
  /** Email */
  email: string;
  /** Password */
  password: string;
};
export type UpdateUserDto = {
  /** Surname */
  surname?: string;
  /** Name */
  firstname?: string;
  /** Patronymic */
  patronymic?: string;
  /** Phone */
  phone?: string;
  /** Email */
  email?: string;
  /** Is checked email */
  checkedEmail?: boolean;
  /** Password */
  password?: string;
  /** Unique identifie */
  idCity?: number;
  /** Avatar image url */
  urlAvatar?: string;
};
export const {
  useUsersControllerCreateMutation,
  useUsersControllerUpdateMutation,
  useUsersControllerDeleteMutation,
  useUsersControllerGetByIdQuery,
  useUsersControllerUpdateAvatarMutation,
} = injectedRtkApi;
