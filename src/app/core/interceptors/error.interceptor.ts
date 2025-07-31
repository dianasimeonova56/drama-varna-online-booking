import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { ErrorService } from "../services";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const errorService = inject(ErrorService);
    
    
    return next(req).pipe(
        catchError((error: HttpErrorResponse)=> {
            let errorMessage = '';

            if(error.error instanceof ErrorEvent) {
                // client side error - fault on the frontend
                errorMessage = error.error.message
            } else {
                // server side error - bakcend indicated an error while doing the request
                errorMessage = error.error?.message || error.message;
            }

            errorService.setError(errorMessage);
            return throwError(() => error);
        })
    );
};

