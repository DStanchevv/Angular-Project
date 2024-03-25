import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy{
    isLoggedIn!: boolean;
    private authSubscription: Subscription;

    constructor(private userService: UserService) { 
        this.authSubscription = this.userService.isAuthenticated.subscribe(
            authenticated => {
                this.isLoggedIn = authenticated;
            }
        );
    }

    profileMenuClasses: String = "hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded bg-white py-1 shadow-lg transition ease-out duration-100";
    profileButtonClasses: String = "flex items-center justify-center w-10 h-10 rounded relative flex max-w-xs items-center bg-gray-800 text-sm hover:bg-gray-700 hover:text-white"
    mobileMenuStyles: String = "md:hidden hidden"
    
    
    get username() {
        if(this.isLoggedIn)
            return this.userService.user?.username;
        else return "";
    }

    get role() {
        if(this.isLoggedIn)
            return this.userService.user?.role;
        else return "";
    }
    
    mobileMenuClick() {
        let menuStyles = this.mobileMenuStyles.split(" ");
        const hiddenIndex = menuStyles.indexOf("hidden");
        
        if(hiddenIndex !== -1) {
            menuStyles.splice(hiddenIndex, 1, "visible");
            this.mobileMenuStyles = menuStyles.join(" ");
        } else {
            const visibleIndex = menuStyles.indexOf("visible");
            menuStyles.splice(hiddenIndex, 1, "hidden");
            this.mobileMenuStyles = menuStyles.join(" ")
        }
    }

    profileClick() {
        let profileMenuClasses: String[] = this.profileMenuClasses.split(" ");
        let profileButtonClasses: String[] = this.profileButtonClasses.split(" ");

        const hiddenIndex = profileMenuClasses.indexOf("hidden");
        if(hiddenIndex !== -1) {
            profileMenuClasses.splice(hiddenIndex, 1, "visible");
            this.profileMenuClasses = profileMenuClasses.join(" ");

            profileButtonClasses.push("outline-none ring-2 ring-white ring-offset-2 ring-offset-gray-800 bg-gray-700");
            this.profileButtonClasses = profileButtonClasses.join(" ");
        } else {
            const visibleIndex = profileMenuClasses.indexOf("visible");
            profileMenuClasses.splice(visibleIndex, 1, "hidden");
            this.profileMenuClasses = profileMenuClasses.join(" ");

            profileButtonClasses.splice(-5);
            this.profileButtonClasses = profileButtonClasses.join(" ");
        }
    }

    logout() {
        this.userService.logout().subscribe();
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}
