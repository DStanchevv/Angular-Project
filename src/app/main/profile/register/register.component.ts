import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = this.fb.group({
    email: ['', [Validators.required, emailValidator()]],
    passGroup: this.fb.group({ password: ['', [Validators.required]], rePassword: ['', [Validators.required]] }, { validators: [matchPasswordsValidator('password', 'rePassword')] })
  })

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {}

  
  register(): void {
    if(this.form.invalid) {
      return;
    }
    
    const { email, passGroup } = this.form.value;
    this.userService.register(email!, passGroup?.password!).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
