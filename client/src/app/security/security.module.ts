import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


import {LoginComponent} from '../login/login.component';
import {UserComponent} from '../user/user.component';
import {RegisterComponent} from '../register/register.component';
import {HomeComponent} from '../home/home.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { MustMatchDirective } from '../register/customValidator/must-match.directive';
import {httpInterceptorProviders} from '../auth/auth-interceptor';
import {from} from 'rxjs';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [],
  exports: [LoginComponent]
})
export class SecurityModule {
}
