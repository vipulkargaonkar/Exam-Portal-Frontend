import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@Angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-add-quiz',
  imports: [MatSelectModule, MatSlideToggleModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule, MatCardModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.scss'
})
export class AddQuizComponent implements OnInit {
  categories=[
    {
      cid: '',
      title: ''
    }
  ];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    noOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  };

  constructor(private cat: CategoryService, private quiz: QuizService) { }

  ngOnInit(): void {
    this.cat.categories().subscribe(
    (data:any)=>{
      this.categories=data;
    },
    err=>{
      Swal.fire("Error in Loading data from server")
    });
  }

  addQuiz() {
    if(this.quizData.title.trim()==''|| this.quizData.description.trim()=='' || this.quizData.maxMarks=='' || this.quizData.noOfQuestions=='' || this.quizData.category.cid=='' || this.quizData==null) {
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'All fields are Required!',
      })
      return;
    }

    this.quiz.addQuiz(this.quizData).subscribe(data => {
      this.quizData.title='';
      this.quizData.description='';
      this.quizData.maxMarks='';
      this.quizData.noOfQuestions='';
      this.quizData.active=false;
      this.quizData.category={cid:''};
      Swal.fire('success','Quiz has been added succesfully','success');
    },
    err=>{
      Swal.fire('Error','Something went wrong!!');
    })
  }
}
