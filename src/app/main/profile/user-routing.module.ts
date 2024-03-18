import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'user',
        children: [
            {path: '', pathMatch: 'full', component: SigninComponent},
            {path: 'signin', component: SigninComponent},
            {path: 'register', component: RegisterComponent},
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
  
}
