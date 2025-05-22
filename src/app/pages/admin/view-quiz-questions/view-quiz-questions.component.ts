import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { QuestionService } from '../../../services/question.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-quiz-questions',
  imports: [RouterModule, MatSelectModule, MatSlideToggleModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule, MatCardModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.scss'
})
export class ViewQuizQuestionsComponent implements OnInit {
  qid: any;
  title: any;

  questions=[{
    quesId:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
      qid:'',
      title:'',
    }
  }];

  constructor(private route: ActivatedRoute, private _question: QuestionService) {

  }
  ngOnInit(): void {
    this.qid =  this.route.snapshot.params['qid'];
    this.title =  this.route.snapshot.params['title'];
    this._question.getQuestionOfQuiz(this.qid).subscribe((data: any) => {
      this.questions = data;
    },
    (error) => {
      Swal.fire("Service Unavailable");
    });
  }

  deleteQuestion(qId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, want to delete this question?'
    }).then((result) => {
      if(result.isConfirmed) {
        this._question.deleteQuestion(qId).subscribe(
          (data) => {
            Swal.fire('success', "Question deleted!!!", 'success');
            this.questions = this.questions.filter((q) => q.quesId != qId)
          }, 
          (err) => {
            Swal.fire('Error', "Something went wrong", 'error');
          }
        )
      }
    })
  }

  
}
