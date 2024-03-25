import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map, tap } from 'rxjs';
import { User } from './types/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();
  
  user: User | undefined;
  userSubscription: Subscription;

  get isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  constructor(private http: HttpClient, private router: Router) {
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    });
  }

  loadProfile() {
    this.getProfile().subscribe({next: value => this.user$$.next(value)});
  }

  login(email: string, password: string) {
    return this.http.post<User>(`/api/login`, { email, password }).pipe(tap((user) => {
      this.user$$.next(user)
    }));
  }

  register(email: string, password: string) {
    return this.http.post<User>(`/api/register`, { email, password }).pipe(tap((user) =>
      this.user$$.next(user)));
  }

  logout() {
    return this.http.post(`/api/logout`, {}, {responseType: "text"}).pipe(tap(() => {
        this.user$$.next(undefined);
        this.router.navigate(['/home']);
      }));
  }

  getProfile() {
    return this.http.get<User>(`/api/profile`);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
