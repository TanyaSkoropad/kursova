import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {MDBBootstrapModule, PopoverModule} from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { SecurityModule } from './security/security.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';
import { PreviewComponent } from './preview/preview.component';
import * as Material from '@angular/material';
import {MatDialog, MatDialogModule} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';
import {MatExpansionModule} from '@angular/material';
import {  ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from "ngx-toastr";
import { MyPostsComponent } from './my-posts/my-posts.component';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { Component, OnInit } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    UserProfileComponent,
    PreviewComponent,
    MyPostsComponent,
    MyMessagesComponent,

    // Material.MatDialogModule,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAojOwUL0HAte_4FqR1pIgXdRIMQ82-ev0'
    }),
    SecurityModule,
    OverlayModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    ToastrModule.forRoot({ timeOut: 3000 }),

  ],
  providers: [
    MatDialog,
    DatePipe
    ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
  exports: [SecurityModule],
  entryComponents: [
    ]
})
export class AppModule {
}
