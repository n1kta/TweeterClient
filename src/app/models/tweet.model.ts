import { UserProfile } from "./userProfile.model";

export interface Tweet {
    id: number;
    description: string;
    photo: string;
    userName: string;
    userProfile: UserProfile[];
    comment: Comment[];
    addedDate: Date;
    likes: number;
    isLiked: boolean;
}