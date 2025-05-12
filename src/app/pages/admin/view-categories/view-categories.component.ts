import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@Angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-categories',
  imports: [RouterModule, MatButtonModule, MatCardModule, MatListModule, CommonModule, MatIconModule, MatDividerModule],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.scss'
})

export class ViewCategoriesComponent implements OnInit {
  categories = [
    {
      "title": "",
      "description": ""
    }
  ]

  constructor(private categoryService: CategoryService){

  }

  ngOnInit(): void {
    this.categoryService.categories().subscribe((data:any) => {
      this.categories = data;
    }, (error) => {
      Swal.fire('Error!!','Error in loading data', 'error');
    });
  }
}
