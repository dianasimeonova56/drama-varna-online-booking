import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ErrorService {
    private _error = signal<string | null>(null);
    private _success = signal<string | null>(null);

    public error = this._error.asReadonly();
    public success = this._success.asReadonly();

    setError(message: string) {
        this._error.set(message);
        setTimeout(() => this._error.set(null), 5000);
    }
}