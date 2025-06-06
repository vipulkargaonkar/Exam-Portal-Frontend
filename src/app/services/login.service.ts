import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  public loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  get isLoggedIn$() {
    return this.loginStatusSubject.asObservable();
  }

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`)
  }

  public generateToken(loginData : any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  public loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn() {
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null) {
      return false
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }


  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem("user");
    if(userStr!=null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
