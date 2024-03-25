import { Injectable } from "@angular/core";
import { CanActivate, UrlTree, Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate() {
        if(this.userService.user?.role == 'Admin') {
            return true;
        }
        else {
            this.router.navigate(['/home']); 
            return false;
        }
    }
}