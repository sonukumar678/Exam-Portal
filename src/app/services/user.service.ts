import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private Http:HttpClient
  ) { }

  public addUser(user:any){
    return this.Http.post(`${baseUrl}/user/`,user);
  }
}
