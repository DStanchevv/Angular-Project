import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/utils/email-validator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  form = this.fb.group({
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder) {}

  signin(): void {
    
  }
}
