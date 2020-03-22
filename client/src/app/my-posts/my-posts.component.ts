import {Component, OnInit} from "@angular/core";
import {Posts} from "./posts";
import {MyPostsService} from "./my-posts.service";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {Globals} from "../globals";
@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  createPostForm: any = {};
  post: Posts;
  types: [string] = [];
  percentDone: number;
  uploadSuccess: boolean;
  filesId: [string] = [];
  posts: [Posts] = [];

  constructor(private postService: MyPostsService, private http: HttpClient) {
  }

  ngOnInit() {
    this.postService.getMyPosts().subscribe(data => {
      this.posts = data;
    })
  }


  createPost() {
    this.post = new Posts(this.createPostForm.description,
      this.createPostForm.location,
      this.types);
    console.log(this.post);
    this.post.files = this.filesId;
    this.postService.sendPostToServer(this.post).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    this.createPostForm.description = '';
    this.createPostForm.location = '';
    this.ngOnInit();
  }

  addType(): void {
    this.types.push(this.createPostForm.types);
    this.createPostForm.types = '';
  }

  upload(files: File[]) {
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  uploadAndProgress(files: File[]) {
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post(Globals.baseURL + '/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.filesId.push(event.body._id);
          this.uploadSuccess = true;
        }
      });
    console.log(this.filesId);
  }


}
