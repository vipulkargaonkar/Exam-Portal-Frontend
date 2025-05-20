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

@Component({
  selector: 'app-add-question',
  imports: [RouterModule, MatSelectModule, MatSlideToggleModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule, MatCardModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss'
})
export class AddQuestionComponent implements OnInit {
  
  qId: any;
  qTitle:any;
  question={
    quiz:{
      qid:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  };

  constructor(private route: ActivatedRoute,private addquestion: QuestionService) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid'];
    this.qTitle=this.route.snapshot.params['title'];
    this.question.quiz['qid']=this.qId;
  }

  formSubmit() {
    if(this.question.content==null || this.question.content.trim()=='') {
      Swal.fire("Error","Please Fill Content","error");
      return
    }
    if(this.question.option1.trim()==''|| this.question.option1==null) {
      Swal.fire("Error","Please Fill option1","error");
      return
    }
    if(this.question.option2.trim()==''|| this.question.option2==null) {
      Swal.fire("Error","Please Fill option2","error");
      return
    }
    if(this.question.answer.trim()==''|| this.question.answer==null) {
      Swal.fire("Error","Please Fill answer","error");
      return
    }
    //Form Submit
    this.addquestion.addQuestion(this.question).subscribe(
      (data:any)=>{
      this.question.content='';
      this.question.option1='';
      this.question.option2='';
      this.question.option3='';
      this.question.option4='';
      this.question.answer='';
      Swal.fire("Success","Question has been added successfully",'success')
    },
    err=>{
      Swal.fire('Error','Something went wrong,try again after sometime','error');
    });
  }


}
