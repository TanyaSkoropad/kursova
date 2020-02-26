import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users/users.service';
import {User} from '../users/user';
import {TokenStorageService} from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfile: User ;
  username: String;
  httpStatusCode: number;
  error: ErrorEvent;
  avatars: String [];
  avatarUploaded: boolean = true;

  
  constructor(private userService: UsersService,
     private tokenStorage: TokenStorageService,
      private router: Router, 
      private dialog: MatDialog) {
  }

  ngOnInit() {
  this.userService.getUserByUsername(this.tokenStorage.getUsername())
  .subscribe(data => this.userProfile = data);

}


closeProfile(){
  this.router.navigate(['ui/home']);
  }

}
