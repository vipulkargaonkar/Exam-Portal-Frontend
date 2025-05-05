import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, NgIf, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user: any;

  constructor(public login: LoginService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.isLoggedIn$.subscribe(data=> {
      this.isLoggedIn = data;
      this.user = this.login.getUser();
    });
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }
}
