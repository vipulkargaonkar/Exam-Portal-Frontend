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
  selector: 'app-instructions',
  imports: [RouterModule, MatButtonModule, MatCardModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.scss'
})
export class InstructionsComponent implements OnInit {
  qid: any;
  quizzes: any;

  constructor(private route: ActivatedRoute, private quiz: QuizService) {

  }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    this.quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        Swal.fire("Error", "Error in loading quiz data from server!!", 'error');
      }
    )
  }

  startQuiz(){
    
  }

}
