import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from '../../services/user-service.service';
import { provideHttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  providers: [
    UserServiceService
  ]
})
export class SignupComponent {

  constructor(private userService: UserServiceService){

  }

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  formSubmit() {
    if(this.user.userName === '' || this.user.userName === null){
      alert("User name is required");
      return;
    }
    this.userService.createUser(this.user).subscribe(
      (data) => {
        console.log(data);
        alert("success")
      },
      (error)=> {
        console.log(error);
        alert("something went wrong");
      }
    );
  }
}
