import { UserProfile } from "./userProfile.model";

export interface Tweet {
    id: number;
    description: string;
    photo: string;
    userName: string;
    userProfile: UserProfile[];
    likes: number;
    isLiked: boolean;
}