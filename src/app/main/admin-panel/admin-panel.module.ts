import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieEditPageComponent } from './movie-edit-page/movie-edit-page.component';
import { MovieAddPageComponent } from './movie-add-page/movie-add-page.component';



@NgModule({
  declarations: [
    AdminPageComponent,
    MovieEditPageComponent,
    MovieAddPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminPanelModule { 

}
