import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http:HttpClient) {}

  login (user: User) {
    return this.http.post(`${environment.baseUrl}/login`, user);
  }

  register (user: User) {
    return this.http.post(`${environment.baseUrl}/register`, user);
  }

  logout() {
    return this.http.post(`${environment.baseUrl}/logout`, {});
  }

  isLoggedIn() {
    const token = localStorage.getItem('expenseAppToken');
    return !!token;
  }

  loginWithGoogle(token: string) {
    return this.http.post(`${environment.baseUrl}/google-login`, { token });
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/change-password`, data);
  }
}
