import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@Angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  public user: any;

  constructor(private login: LoginService){

  }

  ngOnInit(): void {
    this.user = this.login.getUser();
  }

}
