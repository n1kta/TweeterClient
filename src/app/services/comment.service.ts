import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CreateComment } from "../models/createComment.model";
import { Like } from "../models/like.model";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    
    private baseUrl: string = `${environment.apiUrl}/comment`;

    constructor(private http: HttpClient) {
    }

    toggleLike(model: Like) {
        if (model.destinationId && model.userProfileId) {
            const url = `${this.baseUrl}/likeComment`;
            return this.http.post(url, model).toPromise();
        }
    }

    addComment(model: CreateComment) {
        if (model.userProfileId && model.tweetId) {
            const url = `${this.baseUrl}/addComment`;
            return this.http.post(url, model).toPromise();
        }
    }
}