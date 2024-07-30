import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from 'express';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private login:LoginService) { }
   
  
  getToken() {
    let gToken = this.login.getToken();
    return gToken;
  }

  getLogginUser(){
    let loginUser = this.login.getToken();
    if(loginUser == null || loginUser == ' '){
      return false;
    }
    return true;
    
  }

  getUserRole(){
    let userRole = this.login.getUserRole();
    console.log("user role"+ userRole);
    return userRole;
  }
  
}
