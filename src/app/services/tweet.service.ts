import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
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
}