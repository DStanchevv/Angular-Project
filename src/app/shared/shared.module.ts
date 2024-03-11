import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { FilterSearchComponent } from './filters/filter-search/filter-search.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoaderComponent,
    FilterSearchComponent
  ],
  imports: [
    CommonModule,
    NgImageSliderModule,    
    FormsModule,
  ],
  exports: [
    LoaderComponent,
    FilterSearchComponent,
    NgImageSliderModule,
  ]
})
export class SharedModule { }
