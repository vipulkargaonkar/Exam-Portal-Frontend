import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule } from '@Angular/material/card';
import swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, HttpClientModule, MatSnackBarModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  providers: [
      LoginService
    ]
})
export class LoginComponent {

  constructor(private snack : MatSnackBar, private login : LoginService) {

  }

  loginData = {
    username : '',
    password : ''
  }

  formSubmit() {
    if(this.loginData.username.trim() === '' || this.loginData.username === null) {
        this.snack.open("User name is required!!!" , '', {
          duration: 3000
        })
        return;
    }

    if(this.loginData.password.trim() === '' || this.loginData.password === null) {
        this.snack.open("Password is required!!!" , '', {
          duration: 3000
        })
        return;
      }

      this.login.generateToken(this.loginData).subscribe(
        (data:any) => {
           console.log(data);
                  swal.fire({
                    title: "Success",
                    text: "Login successful " + data.username,
                    icon: "success"
                  });
        },
        (error) => {
          console.log(error);
                  swal.fire({
                    title: "Error",
                    text: "Something went wrong!!",
                    icon: "error"
                  });
        }
      )
  }

  
}
