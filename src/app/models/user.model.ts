import { UserProfile } from "./userProfile.model";

export interface User {
    id: number;
    userName: string;
    email: string;
    userProfile: UserProfile;
}