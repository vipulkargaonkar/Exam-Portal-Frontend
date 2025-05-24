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
import { Router } from '@angular/router';
import { authInterceptorProviders } from '../../services/auth.interceptor';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, HttpClientModule, MatSnackBarModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  providers: [
      authInterceptorProviders
    ]
})
export class LoginComponent {

  constructor(private snack : MatSnackBar, private login : LoginService, private router: Router) {

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
                    text: "Login successful ",
                    icon: "success"
                  });

                  this.login.loginUser(data.token);
                  this.login.getCurrentUser().subscribe(
                  (user:any)=>{
                    this.login.setUser(user);
                    console.log(user);
                    
                    if(this.login.getUserRole() === "ADMIN") {
                      this.router.navigate(['admin-dashboard']);
                      this.login.loginStatusSubject.next(true);
                    } else if(this.login.getUserRole() === "NORMAL") {
                      this.router.navigate(['user-dashboard/0']);
                      this.login.loginStatusSubject.next(true);
                    } else {
                      this.login.logout();
                    }
                  });

        },
        (error) => {
          console.log(error);
                  swal.fire({
                    title: "Error",
                    text: "Invalid details !!!",
                    icon: "error"
                  });
        }
      )
  }

  
}
