import { UserProfile } from "./userProfile.model";

export interface ViewProfile {
    id: number;
    userName: string;
    userProfile: UserProfile;
    following: number;
    followers: number;
}