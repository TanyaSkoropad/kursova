import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) {
  }

  isLogged() {
    let isLogged = this.tokenStorage.getToken();

    // TODO
    if (!isLogged
      && !window.location.href.includes('/ui/auth/login')
      && !window.location.href.includes('/ui/signup')
      && !window.location.href.includes('/ui/preview')
      && !window.location.href.includes('/ui/progresbar')) {
      console.log(window.location);
      window.location.href = "/ui/preview";

    }
    return isLogged;
  }

  ngOnInit() {
  }
}
