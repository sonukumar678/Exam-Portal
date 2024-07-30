import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { error } from 'console';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,MatDividerModule,MatCardModule,FormsModule,JsonPipe,MatSnackBarModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 constructor(private snack:MatSnackBar, private login:LoginService,private router: Router){}
  center: any;


  public loginData = {
    username:'',
    password:''
  }

  loginFormSubmit(){
    //alert('login submit')
    if(this.loginData.username == '' || this.loginData.username == null){
      //alert('nul')
      this.snack.open('Username is required !!','ok',{
        duration: 3000
      });
      return;
    }

    if(this.loginData.password.trim() == null || this.loginData.password == ''){
      this.snack.open('password is required !!','ok',{
        duration: 3000
      });
      return;
    }

    //request to server to generate token 
    this.login.generateToken(this.loginData).subscribe((data:any)=>{
      console.log('success..'+data);

      //Login...
      this.login.loginUser(data.token);
      this.login.getCurrentUser().subscribe(
        (user:any) =>{
          this.login.setUserDetails(user);
          console.log('user '+JSON.stringify(user));
          let userRole = this.login.getUserRole();
          if(userRole == 'ADMIN'){
            //admin dashboard
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
            //window.location.href = '/admin';
          }else if(userRole  == 'USER'){
            //user-dashboard
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true);
           // window.location.href = '/user-dashboard';
          }else{
            this.login.loggedOut();
          }
        }
      )
    },
  (error)=>{
    console.log('failed');
    this.snack.open('Invalid User !! Try again','ok',{
      duration: 3000
    });
  })
  }

}
