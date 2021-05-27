import { UserProfile } from "./userProfile.model";

export interface UserInfo {
    id: number;
    userName: string;
    email: string;
    userProfile: UserProfile;
}