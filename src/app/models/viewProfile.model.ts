import { UserProfile } from "./userProfile.model";

export interface ViewProfile {
    id: number;
    userName: string;
    userProfile: UserProfile;
    followers: number;
    followings: number;
}