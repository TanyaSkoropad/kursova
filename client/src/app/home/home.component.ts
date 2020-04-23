import {Component, OnInit} from '@angular/core';

import {TokenStorageService} from '../auth/token-storage.service';
import {Posts} from "../my-posts/posts";
import {MyPostsService} from "../my-posts/my-posts.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Posts[];
  info: any;


  constructor(private postService: MyPostsService, private token: TokenStorageService) {
  }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
    })
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
    };
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

}
