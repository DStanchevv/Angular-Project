import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MovieEditPageComponent } from './movie-edit-page/movie-edit-page.component';
import { MovieAddPageComponent } from './movie-add-page/movie-add-page.component';
import { RoleGuard } from 'src/app/guards/role.active';

const routes: Routes = [
    {
        path: 'admin-panel',
        canActivate: [RoleGuard],
        children: [
            {path: '', pathMatch: 'full', component: AdminPageComponent},
            {path: 'add-movie', component: MovieAddPageComponent},
            {path: ':movieId', component: MovieEditPageComponent}
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 
  
}
