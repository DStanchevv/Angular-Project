import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MovieModule } from './main/movie/movie.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeCardComponent } from './home/home-card/home-card.component';
import { AdminPanelModule } from './main/admin-panel/admin-panel.module';
import { appInterceptorProvider } from './app.interceptor';
import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactsComponent,
    HomeCardComponent,
    WrapperComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    MovieModule,
    AdminPanelModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
