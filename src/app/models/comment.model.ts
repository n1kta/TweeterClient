import { Tweet } from "./tweet.model";
import { UserProfile } from "./userProfile.model";

export interface Comment {
    description: string;
    userProfile: UserProfile
    tweet: Tweet;
    addedDate: Date;
}