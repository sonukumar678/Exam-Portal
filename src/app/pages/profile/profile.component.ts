import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { JsonPipe } from '@angular/common';
import { error } from 'node:console';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatButtonModule,JsonPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user:any;
  constructor(public login:LoginService){}

  ngOnInit(): void {
    //this.user = this.login.getUser();
    this.login.getCurrentUser().subscribe((user:any)=>{
      this.user = user;
    },
  (error)=>{
    alert("Error message is: "+error);
  })
  }

}
