import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = this.authService.getToken();

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }

}