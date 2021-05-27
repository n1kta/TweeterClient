import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
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
            this.baseUrl += `/${userId}`;
            return this.http.put(this.baseUrl, userProfile).toPromise();
        }
    }
}