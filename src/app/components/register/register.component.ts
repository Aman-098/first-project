import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Register } from '../../model/class/Register';
import { ValidationMessage } from '../../constant/validation-messages';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registrationForm:FormGroup=new FormGroup({

    name:new FormControl("",[Validators.required,Validators.minLength(4)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.minLength(6)]),

  });

  validationMessage = ValidationMessage;

  formValue:Register|null=null;

  constructor(){}

  onSubmit(){
    debugger;
    if(this.registrationForm.valid){
      this.formValue=this.registrationForm.value
      if(this.formValue){
        localStorage.setItem('register',JSON.stringify(this.formValue));
      }    
      console.log("form submitted",this.formValue)
    }else{
      console.log("form is invalid")
    }

  }


  

}
