import { Tweet } from "./tweet.model";
import { UserProfile } from "./userProfile.model";

export interface Comment {
    id: number;
    description: string;
    userProfile: UserProfile
    tweet: Tweet;
    isLiked: boolean;
    likes: number;
    addedDate: Date;
}