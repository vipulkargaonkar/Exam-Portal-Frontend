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

@Component({
  selector: 'app-view-quiz-questions',
  imports: [MatSelectModule, MatSlideToggleModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule, MatCardModule, CommonModule, FormsModule, MatButtonModule],
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

  
}
