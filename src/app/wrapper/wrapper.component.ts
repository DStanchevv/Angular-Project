import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
})
export class WrapperComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loadProfile();
  }
}