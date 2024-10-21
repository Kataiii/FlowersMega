import { Role } from "src/roles/roles.model";

export type PayloadToken = {
    email: string;
    id: number;
    roles: Role[];
}