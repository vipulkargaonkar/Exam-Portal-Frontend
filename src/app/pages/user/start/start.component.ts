import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatCardModule } from '@Angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-start',
  imports: [MatProgressSpinnerModule, RouterModule, MatSelectModule, MatSlideToggleModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule, MatCardModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent implements OnInit {

  qid: any;
  questions:any;
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;
  timer:any;
  

  constructor(private locationSt: LocationStrategy, private route: ActivatedRoute, private question: QuestionService) { }

  
  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.route.snapshot.params['qid'];
    this.loadQuestions();
  }


  loadQuestions() {
    this.question.getQuestionOfQuizForTest(this.qid).subscribe(
      (data:any) => {
        this.questions = data;
        this.questions.forEach((q:any) => {
          this.timer=this.questions.length*2*60;
          q['givenAnswer'] = '';
        });
        this.startTimer();
      },
      err => {
        Swal.fire("Error","Something Went Wrong","error");
    });
  }

  preventBackButton()
  {
    history.pushState(null,"null",location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,"null",location.href);
    });
  }

  startTimer() {
    let t=window.setInterval(()=>{
    if(this.timer<=0) {
      this.evalQuiz();
      clearInterval(t);
    }else{
      this.timer--;
    }
    },1000)
  }

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info'
    }).then(e=>{
      if(e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  evalQuiz() {
    this.isSubmit=true;
    this.questions.forEach((q: { givenAnswer: any; answer: any; })=>{
      if(q.givenAnswer==q.answer) {
        this.correctAnswers++;
        let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
        this.marksGot+=marksSingle;
      }
      if(q.givenAnswer.trim()!='') {
        this.attempted++;
      }
    });
  }


  printPDF() {
    window.print();
  }

  getFormattedTime() {
    let mm=Math.floor(this.timer/60);
    let ss=this.timer - mm*60;
    return `${mm} Min : ${ss} Sec`;
  }

}
