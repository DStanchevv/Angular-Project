import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
    profileMenuClasses: String = "hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100";
    profileButtonClasses: String = "relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm"
    mobileMenuStyles: String = "md:hidden hidden"
    // Dropdown menu, show/hide based on menu state.

    // Entering: "transition ease-out duration-100"
    //     From: "transform opacity-0 scale-95"
    //     To: "transform opacity-100 scale-100"
    // Leaving: "transition ease-in duration-75"
    //     From: "transform opacity-100 scale-100"
    //     To: "transform opacity-0 scale-95"
    
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

            profileButtonClasses.push("outline-none ring-2 ring-white ring-offset-2 ring-offset-gray-800");
            this.profileButtonClasses = profileButtonClasses.join(" ");
        } else {
            const visibleIndex = profileMenuClasses.indexOf("visible");
            profileMenuClasses.splice(visibleIndex, 1, "hidden");
            this.profileMenuClasses = profileMenuClasses.join(" ");

            profileButtonClasses.splice(-5);
            this.profileButtonClasses = profileButtonClasses.join(" ");
        }
    }
}
