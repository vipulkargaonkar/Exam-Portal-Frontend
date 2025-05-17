import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import { MatCardModule } from '@Angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-quiz',
  imports: [MatSelectModule, MatSlideToggleModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule, MatCardModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.scss'
})
export class UpdateQuizComponent implements OnInit{
  
  constructor(private route: ActivatedRoute, private _quiz: QuizService, private cat: CategoryService,private router:Router) {

  }
  
  qid=0;
  quiz: any;
  categories: any;

  ngOnInit(): void {
    this.qid=this.route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any) => {
        this.quiz = data;
    });

    this.cat.categories().subscribe(
      (data:any) => {
        this.categories = data;
    })
  }

  updateForm() {
    this._quiz.updateQuiz(this.quiz).subscribe(
    (data) => {
      Swal.fire('Success', 'Quiz has been updated', 'success').then((e => {
      this.router.navigate(['admin-dashboard/quizzes'])
      }));
    },
    err => {
      Swal.fire('Error', 'Something went wrong', 'error');
    });
  }

}
