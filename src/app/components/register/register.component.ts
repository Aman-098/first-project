import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Register } from '../../model/class/Register';
import { ValidationMessage } from '../../constant/validation-messages';
import { AlertComponent } from '../../reusablecomponent/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule,AlertComponent,CommonModule],
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
  message:string='';
  alertType:string='';
  alert:boolean=false

  constructor(){}

  onSubmit(){
    debugger;
    if(this.registrationForm.valid){
      this.formValue=this.registrationForm.value
      if(this.formValue){
        localStorage.setItem('register',JSON.stringify(this.formValue));
      }

      this.showAlert("Registration Successfull","success",3000);
      this.registrationForm.reset();

    }else{

      this.showAlert("Registration Failed","danger",3000)
  
    }
  }

  showAlert(message:string,type:string,duration:number){
    this.message=message;
    this.alertType=type;
    this.alert=true
    this.alertClose(3000)
  }

  alertClose(time:number){
    setTimeout(() => {
      this.alert=false;
    }, time);
  }


  

}
