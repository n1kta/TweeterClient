import { UserProfile } from "./userProfile.model";

export interface Tweet {
    description: string;
    photo: string;
    userName: string;
    userProfile: UserProfile[];
}