import { UserProfile } from "../userProfile.model";
import { BaseAuth } from "./auth.model";

export interface Registration extends BaseAuth {
    email: string;
    repeatPassword: string;
    userProfile: UserProfile;
}