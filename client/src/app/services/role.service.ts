import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Globals } from '../globals';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleUrl = Globals.baseURL + '/role';

  constructor(private http: HttpClient) {
  }

  getAllRoles(): Observable<String[]> {
    return this.http.get<String[]>(this.roleUrl, httpOptions);
  }
}
