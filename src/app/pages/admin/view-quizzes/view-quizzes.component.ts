import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@Angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-quizzes',
  imports: [MatCardModule, CommonModule, MatButtonModule, RouterModule],
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

  deleteQuiz(qid: String) {

    Swal.fire({
      icon: 'info',
      title: "Are you sure?",
      confirmButtonText: 'Delete', 
      showCancelButton: true
    }).then((result) => {
      if(result.isConfirmed){
        this.quiz.deleteQuiz(qid).subscribe((data : any) => {
          this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid)
          Swal.fire('Success', "Quiz deleted", 'success');
        },
        err => {
          Swal.fire("Error", "Error in deleting quiz", 'error');
        });
      }
    })
  }

}
