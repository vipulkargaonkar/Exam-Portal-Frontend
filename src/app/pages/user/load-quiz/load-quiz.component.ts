import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@Angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-load-quiz',
  imports: [RouterModule, MatButtonModule, MatCardModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.scss'
})
export class LoadQuizComponent implements OnInit {
  
  catId: any;
  quizzes: any;

  constructor(private router: ActivatedRoute, private quiz: QuizService) {

  }

  ngOnInit(): void {
    this.router.params.subscribe((param)=>{
      this.catId = param['catId'];
      if(this.catId == 0) {
      this.quiz.getActiveQuizzes().subscribe(
        (data: any) => {
          this.quizzes = data;
        },
        (err) => {
          Swal.fire("Error", "Error in loading data from server!!", 'error');
        }
      )
    }
    else {
      this.quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
        (data: any) => {
          this.quizzes = data;
        },
        (err) => {
          Swal.fire("Error", "Error in loading quiz data from server!!", 'error');
        }
      )
    }
    });
  }
}
