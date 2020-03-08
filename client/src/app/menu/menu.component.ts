import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private roles: String[];
  private authority: String;
  private username: String;
  user: User = new User(null, null, null, null);
  private notificationsOpen: boolean;


  constructor(private tokenStorage: TokenStorageService, private userService: UsersService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.notificationsOpen = false;
    this.username = this.tokenStorage.getUsername();

    this.userService.getUserByUsername(this.username)
      .subscribe(data => this.user = data);

  }


  goToMyPosts(){
    this.router.navigate(['/ui/my-posts']);
  }

  logout(){
    this.tokenStorage.signOut();
    window.location.href='/ui/preview';
  }



  goToUserProfile(){
    this.router.navigate(['/ui/userprofile']);
  }

  goHome(){
    this.router.navigate(['/ui/home']);
  }
}
