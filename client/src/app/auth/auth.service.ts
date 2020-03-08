import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {JwtResponse} from "./jwt-response";
import {AuthLoginInfo} from "./login-info";
import {SignUpInfo} from "src/app/auth/signup-info";
import {Globals} from "../globals";
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = Globals.baseURL + '/login';
  private signupUrl = Globals.baseURL + '/registration';
  private checkEmailUrl = Globals.baseURL + '/checkEmail';

  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }


  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  checkEmail(email: String) {
    return this.http.post<void>(this.checkEmailUrl, {email},httpOptions);
  }

}
