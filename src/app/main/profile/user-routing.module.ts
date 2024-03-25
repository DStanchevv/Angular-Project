import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { AuthActivate } from 'src/app/guards/auth.active';

const routes: Routes = [
    {path: 'signin', component: SigninComponent, canActivate: [AuthActivate]},
    {path: 'register', component: RegisterComponent, canActivate: [AuthActivate]},
    {path: '', pathMatch: 'full', component: SigninComponent, canActivate: [AuthActivate]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
  
}
