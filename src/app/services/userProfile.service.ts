import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Follow } from "../models/follow.model";
import { UserProfile } from "../models/userProfile.model";

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    private baseUrl: string = `${environment.apiUrl}/userProfile`;

    constructor(private http: HttpClient) {
        
    }

    update(userId: number, userProfile: UserProfile) {
        if (userId) {
            const url = `${this.baseUrl}/${userId}`;
            return this.http.put(url, userProfile).toPromise();
        }
    }

    follow(model: Follow) {
        const url = `${this.baseUrl}/follow`;
        return this.http.post(url, model).toPromise();
    }

    howManyFollowerFollowing(userProfileId: number) {
        const url = `${this.baseUrl}/getFollowerFollowing/${userProfileId}`;
        return this.http.get(url).toPromise();
    }
}