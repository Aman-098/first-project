import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Register } from '../../model/class/Register';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registrationForm:FormGroup=new FormGroup({

    name:new FormControl(""),
    email:new FormControl(''),
    password:new FormControl(""),

  });

  formValue:Register|null=null;


  onSubmit(){
    debugger;
    this.formValue=this.registrationForm.value

  }


  

}
