import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../model/class/Login';
import { ValidationMessage } from '../../constant/validation-messages';
import { AlertComponent } from '../../reusablecomponent/alert/alert.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule,AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  });

  formValue:Login|null=null;

  router=inject(Router);

  validatonMessage=ValidationMessage

  onLogin(){

    const data= JSON.parse(localStorage.getItem('register') || '{}');
    if(this.loginForm.valid){
      this.formValue=this.loginForm.value
      if(data.email && this.formValue?.email === data.email){
        if(this.formValue?.password===data.password){
          console.log("logged in ")
        }else{
          console.log("incorrect password")
        }
      }else{
        console.log("user not found")
      }
    }else{
      console.log("form is invalid ");
    }

  }





}
