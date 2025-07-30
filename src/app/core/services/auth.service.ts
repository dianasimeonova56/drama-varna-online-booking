import { Injectable, signal } from "@angular/core";
import { User } from "../../models";

@Injectable({
    providedIn: 'root' // we can inject it in the project] we can create instance of it 
    //we provide it in the root of the project to be available everywhere?
})

export class AuthService {
    //encapsulation for the service
    private _isLoggedIn = signal<boolean>(false); //only the service can access the signals
    private _currentUser = signal<User | null>(null);
    private _users: User[] = [
        { id: '5fa64a072183ce1728ff3719', email: 'john.doe@gmail.com', username: "David", role: "Admin"  },
        { id: '5fa64b162183ce1728ff371d', email: 'john.dolly@gmail.com', username: "Angel", role: "Admin"   },
        { id: '5fa64b972183ce1728ff3720', email: 'john.felt@gmail.com', username: "Nicky", role: "User"   },
    ]

    public isLoggedIn = this._isLoggedIn.asReadonly(); // componnets can only READ it cant modify it 
    public currentUser = this._currentUser.asReadonly();

    constructor() {
        const savedUser = localStorage.getItem('currentUser') // check if user exists
        if (savedUser) {
            const user: User = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }


    login(email: string, password: string): boolean {
        if (email && password) {
            const user = this._users[0];
            this._currentUser.set(user);
            this._isLoggedIn.set(true);

            localStorage.setItem('currentUser', JSON.stringify(user));

            return true;
        }

        return false;
    }

    register(email: string, username: string, password: string, rePassword: string, role: string): boolean {
        if (email && username && role && password && rePassword) {
            //we send the pass and rePass ro backend to check
            const newUser: User = {
                id: `user_${Date.now}`,
                email,
                username,
                role
            }
            this._users.push(newUser);

            this._currentUser.set(newUser);
            this._isLoggedIn.set(true);


            //it shpuld be a call to the backend
            localStorage.setItem('currentUser', JSON.stringify(newUser))

            return true;

        }
        return false;
    }

    logout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);

        localStorage.removeItem('currentUser');
    }

    getCurrentUserId(): string | null {
        return this._currentUser()?.id || null
    }

    updateUser(user: User): void {
        const userIndex = this._users.findIndex(u => u.id === user.id);

        if (userIndex !== -1) {
            this._users[userIndex] = user;
             console.log(this._users[userIndex]);
        }
       
        

        this._currentUser.set(user);

        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}