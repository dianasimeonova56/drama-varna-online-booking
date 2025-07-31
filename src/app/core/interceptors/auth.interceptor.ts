import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    const token = authService.getToken();

    const authRequest = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authRequest);
}