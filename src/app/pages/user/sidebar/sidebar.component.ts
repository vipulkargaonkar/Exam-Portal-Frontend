import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@Angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-user',
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  categories: any;

  constructor(private category: CategoryService){

  }

  ngOnInit(): void {
    this.category.categories().subscribe(
      (data:any) => {
        this.categories = data;
      },
      (err) => {
        Swal.fire("Error", "Error in loading data from server!!", 'error');
      }
    )
  }

}
