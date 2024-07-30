import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterModule} from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,RouterModule,CommonModule,MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  user:any;
  constructor(public login:LoginService, private _route:Router){
    
  }
  ngOnInit(): void {
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data)=>{
      this.user = this.login.getUser();
    })
  }
  //userName = this.login


  public logout(){
    this.login.loggedOut();
    this._route.navigate(['login']);
  }
  center: any;
}
