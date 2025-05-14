import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@Angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.scss'
})
export class ViewQuizzesComponent implements OnInit {
  quizzes=[
    {
      qid:'',
      title:'',
      description:'',
      maxMarks:'',
      noOfQuestions:'',
        category:{
          cid:'',
          title:''
        }
    }
  ];


  constructor(private quiz: QuizService) { }

  ngOnInit(): void {
    this.quiz.quizzes().subscribe((data: any) => {
      this.quizzes=data;
    },
    err => {
      Swal.fire("Error in loading data")
    });
  }

}
