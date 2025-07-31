import { Injectable, signal } from "@angular/core";
import { User } from "../../models";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root' // we can inject it in the project] we can create instance of it 
    //we provide it in the root of the project to be available everywhere?
})

export class AuthService {
    //encapsulation for the service
    private apiUrl = 'http://localhost:3000/api'
    private _isLoggedIn = signal<boolean>(false); //only the service can access the signals
    private _currentUser = signal<User | null>(null);

    public isLoggedIn = this._isLoggedIn.asReadonly(); // componnets can only READ it cant modify it 
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
        const savedUser = localStorage.getItem('currentUser') // check if user exists
        if (savedUser) {
            const user: User = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }


    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/login`, { email, password }, {
            withCredentials: true
        }).pipe(
            tap(user => {
                console.log(user);
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user))
            })
        );
    }

    register(email: string, username: string, password: string, rePassword: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, {
            username,
            email,
            password,
            rePassword,
            role: 'user'
        }, {
            withCredentials: true
        }).pipe(
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user))
            })
        );
    }

    logout(): Observable<void> {
        return this.httpClient.post<void>(`${this.apiUrl}/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => {
                this._currentUser.set(null);
                this._isLoggedIn.set(false);
                localStorage.removeItem('currentUser')
            })
        );
    }

    getCurrentUserId(): string | null {
        return this._currentUser()?.id || null
    }

    updateUser(user: User): Observable<User> {
        return this.httpClient.put<User>(`${this.apiUrl}/users/${user.id}`, {
            _id: user.id,
            username: user.username,
            email: user.email,
        }, {
            withCredentials: true
        }).pipe(
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user))
            })
        );
    }
    
    getToken(): string {
        return 'FAKE_TOKEN=12345'
    }

    getCurrentUserRole(): string | null {
        return this._currentUser()?.role || null;
    }
}