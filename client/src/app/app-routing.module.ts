import {NgModule, Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {MenuComponent} from './menu/menu.component';
import {UsersComponent} from './users/users.component';
import { PreviewComponent } from './preview/preview.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MyPostsComponent} from "./my-posts/my-posts.component";
import {MyMessagesComponent} from "./my-messages/my-messages.component";
const routes: Routes = [
  // { path: '**', redirectTo: 'auth/login'},


  {
    path: 'ui/preview',
    component: PreviewComponent
  },
  {
    path: 'ui/home',
    component: HomeComponent
    // component: MenuComponent
  },
  {
    path: 'ui/user',
    component: UserComponent
  },
  {
    path: 'ui/auth/login',
    component: LoginComponent
  },
  {
    path: 'ui/signup',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'ui/home',
    pathMatch: 'full'
  },
  {
    path: 'ui/userprofile',
    component: UserProfileComponent
  },
  {
    path: 'ui/my-posts',
    component : MyPostsComponent
  },
  {
    path: 'ui/my-messages',
    component: MyMessagesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
