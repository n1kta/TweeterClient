import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Like } from "../models/like.model";
import { Tweet } from "../models/tweet.model";

@Injectable({
    providedIn: 'root'
})
export class TweetService {
    
    private baseUrl: string = `${environment.apiUrl}/tweet`;

    constructor(private http: HttpClient) {
    }

    create(userId: number, model: Tweet) {
        if (userId) {
            const url = `${this.baseUrl}/${userId}`;
            return this.http.post(url, model).toPromise();
        }
    }

    getTweetsFollowers(userProfileId: number) {
        if (userProfileId) {
            const url = `${this.baseUrl}/getTweetsFollowers/${userProfileId}`;
            return this.http.get(url).toPromise();
        }
    }

    toggleLike(model: Like) {
        if (model.destinationId && model.userProfileId) {
            const url = `${this.baseUrl}/like`;
            return this.http.post(url, model).toPromise();
        }
    }
}