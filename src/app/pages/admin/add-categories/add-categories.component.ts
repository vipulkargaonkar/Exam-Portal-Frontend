import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@Angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.scss'
})
export class AddCategoriesComponent implements OnInit {

  category = {
    title:'',
    description:''
  }

  ngOnInit(): void {
    
  }

  constructor(private _category: CategoryService) { }

  formSubmit() {
  if(this.category.title.trim()==''||this.category.description.trim()==''||this.category==null) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'All fields are Required!',
    })
    return;
  }
  this._category.addcategory(this.category).subscribe(
          (data:any)=>{
              this.category.title = '';
              this.category.description = '';
              Swal.fire('Success','Category added successfully','success');
          },
          err=>{
              Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong!',
        })
    });
  }
}
