import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { Observable, of } from "rxjs";
import { catchError, map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthActivate implements CanActivate{
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.getProfile().pipe(
      map(user => {
          this.router.navigate(['/home']);
          return false;
      }),
      catchError(error => {
        if (error.status === 401) {
          return of(true);
        } else {
          this.router.navigate(['/home']);
          return of(false);
        }
      })
    );
  }
}