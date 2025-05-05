import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from '../../services/user-service.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import swal from 'sweetalert2';
import { MatCardModule } from '@Angular/material/card';

@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, HttpClientModule, MatSnackBarModule, MatCardModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  providers: [
    UserServiceService
  ]
})
export class SignupComponent {

  constructor(private userService: UserServiceService, private _snack: MatSnackBar){

  }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  formSubmit() {
    if(this.user.username.length<=3){
      this._snack.open("Username length should be greater than 3!!", 'OK', {
        duration: 3000
      });
      return;
    }

    //TODO: VALIDATION    

    this.userService.createUser(this.user).subscribe(
      (data:any) => {
        console.log(data);
        swal.fire({
          title: "Success",
          text: "User is registered with id = " + data.id,
          icon: "success"
        });
      },
      (error)=> {
        console.log(error);
        swal.fire({
          title: "Error",
          text: "Something went wrong!!",
          icon: "error"
        });
      }
    );
  }
}
