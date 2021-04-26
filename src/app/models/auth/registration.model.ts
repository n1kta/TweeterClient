import { BaseAuth } from "./auth.model";

export interface Registration extends BaseAuth {
    email: string;
    repeatPassword: string;
}