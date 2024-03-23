import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from './types/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    const { apiUrl } = environment;
    return this.http.post<User>(`${apiUrl}/login`, { email, password }).pipe(tap((user) =>
      this.user$$.next(user)));
  }

  register(email: string, password: string) {
    const { apiUrl } = environment;
    return this.http.post<User>(`${apiUrl}/register`, { email, password }).pipe(tap((user) =>
      this.user$$.next(user)));
  }

  logout() {
    const { apiUrl } = environment;
    return this.http.post(`${apiUrl}/logout`, {}).pipe(tap((user) =>
      this.user$$.next(undefined)));
  }

  getProfile() {
    const { apiUrl } = environment;
    return this.http.get<User>(`${apiUrl}/users/profile`).pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
