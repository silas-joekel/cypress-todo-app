import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type User = 'Admin' | 'User' | 'Guest'

@Injectable()
export class UserService {
    #user = new BehaviorSubject<User>('Admin');

    user$ = this.#user.asObservable();

    getUser(): User {
        return this.#user.value;
    }

    loginAsUser(): void {
        this.#user.next('User');
    }

    loginAsAdmin(): void {
        this.#user.next('Admin')
    }

    logout(): void {
        this.#user.next('Guest')
    }
}