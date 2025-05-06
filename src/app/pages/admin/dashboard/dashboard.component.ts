import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@Angular/material/card';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [MatListModule, MatCardModule, SidebarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
