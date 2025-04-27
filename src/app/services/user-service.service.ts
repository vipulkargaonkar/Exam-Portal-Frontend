import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  //create User
  public createUser(user: any){
    return this.http.post(`${baseUrl}/user/create`, user);
  }

}
