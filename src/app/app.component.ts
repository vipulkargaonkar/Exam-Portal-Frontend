import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from "./components/navbar/navbar.component";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule  } from "ngx-ui-loader";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxUiLoaderModule, RouterOutlet, MatButtonModule, NavbarComponent, MatInputModule, MatFormFieldModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'exam-portal-frontend';
}
