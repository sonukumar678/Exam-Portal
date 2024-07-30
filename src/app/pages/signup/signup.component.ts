import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,MatDividerModule,FormsModule,MatSnackBarModule,MatCardModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private userService:UserService, private snack:MatSnackBar){}
center: any;



public user = {
  username : '',
  password : '',
  firstName : '',
  lastName : '',
  email : '',
  phone : ''
}

formSubmit(){
  console.log(this.user);
  if(this.user.username == "" || this.user.username == null ||  this.user.username == undefined){
    //alert('user is required');
    this.snack.open('Username is required !!','ok',{
      duration: 3000
    });
    return;
  }

  this.userService.addUser(this.user).subscribe(
    (data:any)=>{
      //success
      console.log('success...');
      //alert('success...')
      swal.fire('Success done !!','User id is' + data.id,'success');
    },
    (error)=>{
      console.log(error.error.text);
      this.snack.open(error.error.text,'ok',{
        duration: 3000
      });
    }
  )
}


}
