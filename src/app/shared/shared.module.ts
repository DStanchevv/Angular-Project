import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NgImageSliderModule } from 'ng-image-slider';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    NgImageSliderModule,
  ],
  exports: [
    LoaderComponent,
    NgImageSliderModule,
  ]
})
export class SharedModule { }
