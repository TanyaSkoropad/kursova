import {Component, OnInit} from "@angular/core";
import {Posts} from "./posts";

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  createPostForm: any = {};
  post: Posts;
  types:[string] = [];

  constructor() {
  }

  ngOnInit() {
  }


  createPost() {
    this.post = new Posts(this.createPostForm.description,
                          this.createPostForm.location,
                          this.types);



  }

  addType(): void {
    this.types.push(this.createPostForm.types);
    this.createPostForm.types = '';
  }

}
