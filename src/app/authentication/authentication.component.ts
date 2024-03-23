import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent implements OnInit{
  
  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {
    
  }
}
